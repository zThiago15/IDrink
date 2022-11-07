const md5 = require('md5');
const { UserModel } = require('../database/models');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorNotFound = require('../errors/ErrorNotFound');
require('express-async-errors');

const createUser = async (userInfo) => {  
  const { password, name, email, role } = userInfo;

  const cryptedPassword = md5(password);
  const user = await UserModel.findOne({ where: { email, password: cryptedPassword } });

  if (user) {
    throw new ErrorConflict('User already exists');
  }

  await UserModel.create({ 
    name,
    email,
    role,
    password: cryptedPassword,
  });

  return true;
};

const allUsers = async () => {
  const users = await UserModel.findAll();
  return users;
};

const deleteUser = async (userInfo) => {
  const { email, password } = userInfo;
  const cryptedPassword = md5(password);

  const user = await UserModel.findOne({ where: { email, password: cryptedPassword } });
  if (!user) {
    throw new ErrorNotFound('User not found');
  }
  const { id } = user;

  await UserModel.destroy({ where: { id } });
};

module.exports = { createUser, allUsers, deleteUser };