const router = require("express").Router();
const { Company, Promotion, User } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ["id", "name"],
      include: {
        model: Promotion,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    });
    const data = companies.map((el) => el.get({ plain: true }));
    const upData = data.map((el) => {
      return {
        ...el,
        Promotions: el.Promotions.map((el) => {
          return {
            ...el,
            Users: el.Users.map((el) => el.username),
          };
        }),
      };
    });
    res.json(upData);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
