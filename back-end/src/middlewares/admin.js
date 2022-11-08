const { UserModel } = require('../database/models');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const isAdmin = async (req, res, next) => {
  const { id } = res.locals.user;
  const { role } = await UserModel.findOne({ where: { id } });
  if (role !== 'administrator') {
    throw new ErrorUnauthorized('Only administrator users allowed');
  }

  next();
};

module.exports = { isAdmin };