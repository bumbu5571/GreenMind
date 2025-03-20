const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.clearCookie('refreshToken').sendStatus(401);
  }
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // авторизация не устанавливается
    const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = token.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'accsess token error' });
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
