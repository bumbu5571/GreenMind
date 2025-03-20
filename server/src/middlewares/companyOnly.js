require('dotenv').config();

function companyOnly(req, res, next) {
  console.log('res.locals.user', res.locals.user);
  if (!res.locals.user.isCompany) {
    return res.status(403).json({ message: 'Права есть только у компании' });
  }

  return next();
}

module.exports = companyOnly;
