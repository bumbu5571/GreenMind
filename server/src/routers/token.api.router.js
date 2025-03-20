const router = require('express').Router();
const { verifyRefreshToken } = require('../middlewares/verifyTokens');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../configs/cookieConfig');
const { User, Company } = require('../../db/models');

router.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { accessToken, refreshToken } = generateToken({
    user: res.locals.user,
  });
  // добавлено для процесса обновления профиля:
  const id = res.locals.user.id;
  try {
    if (res.locals.user.isCompany) {
      const company = await Company.findByPk(id);
      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: company, accessToken });
    } else {
      const user = await User.findByPk(id);
      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: user, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка (' });
  }
  // конец-------------
  //  изначальный код:
  // res
  //   .cookie("refreshToken", refreshToken, cookieConfig.refresh)
  //   .json({ user: res.locals.user, accessToken});
});

module.exports = router;
