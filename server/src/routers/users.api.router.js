const router = require('express').Router();
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router.get('/', verifyAccessToken, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'score'],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
