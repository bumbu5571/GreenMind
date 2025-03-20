const router = require("express").Router();
const { User, Company, Promotion } = require("../../db/models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cookieConfig = require("../configs/cookieConfig");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

const createCompany = async ({ email, name, password }) => {
  return await Company.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      isCompany: true,
    },
  });
};

const createUser = async ({ email, name, password }) => {
  return await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      username: name,
      password: await bcrypt.hash(password, 10),
      isCompany: false,
    },
  });
};

const foundedUser = async ({ email }) =>
  await User.findOne({ where: { email } });

const foundedCompany = async ({ email }) =>
  await Company.findOne({ where: { email } });

async function foundedCompanyPatch(id) {
  return await Company.findByPk(id); // Пример для Sequelize
}

async function foundedUserPatch(id) {
  return await User.findByPk(id); // Пример для Sequelize
}
// ------------------------------------------------------------------
router.post("/signup", async (req, res) => {
  const { name, email, password, isCompany } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Необходимо заполнить все поля" });
  }

  try {
    const [entity, isCreated] = Boolean(isCompany)
      ? await createCompany(req.body)
      : await createUser(req.body);

    if (!isCreated) {
      return res.status(400).json({ message: "Такой пользователь существует" });
    }

    const plainEntity = entity.get();

    delete plainEntity.password;
    delete plainEntity.createdAt;
    delete plainEntity.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainEntity });

    res
      .cookie("refreshToken", refreshToken, cookieConfig.refresh)
      .json({ user: plainEntity, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка регистрации" });
  }
});

// ------------------------------------------------------------------
router.post("/signin", async (req, res) => {
  const { email, password, isCompany } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Необходимо заполнить все поля" });
  }

  try {
    const entity = isCompany
      ? await foundedCompany(req.body)
      : await foundedUser(req.body);

    if (!entity) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isCorrectPassword = await bcrypt.compare(password, entity.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Некорректный email или пароль" });
    }
    const plainEntity = entity.get();
    delete plainEntity.password;
    delete plainEntity.createdAt;
    delete plainEntity.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainEntity });

    res
      .cookie("refreshToken", refreshToken, cookieConfig.refresh)
      .json({ user: plainEntity, accessToken });
    const selectPromotion = await Promotion.findOne({
      where: { id: 8 },
    });
    const dateEnd = new Date(selectPromotion.dateEnd);
    dateEnd.setMinutes(dateEnd.getMinutes() - 10);
    selectPromotion.dateEnd = dateEnd;
    await selectPromotion.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка авторизации" });
  }
});

// ------------------------------------------------------------------
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshToken").sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.patch("/", verifyAccessToken, async (req, res) => {
  const id = res.locals.user.id;

  const { name, username, email, currentPassword, newPassword, isCompany } =
    req.body;

  try {
    const user = isCompany
      ? await foundedCompanyPatch(id)
      : await foundedUserPatch(id);

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    if (username || name) {
      if (isCompany) {
        user.name = name;
      } else {
        user.username = username;
      }
    }
    if (email) user.email = email;
    if (currentPassword && newPassword) {
      const isCorrectPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        return res
          .status(400)
          .json({ message: "Некорректный email или пароль" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.status(200).json({
      message: "Данные успешно обновлены",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении данных" });
  }
});

module.exports = router;
