const adminService = require('../services/adminService');

const createUser = async (req, res, _next) => {
  const userInfo = req.body;

  await adminService.createUser(userInfo);
  return res.status(201).end();
};

const allUsers = async (req, res, _next) => {
  const users = await adminService.allUsers();
  return res.status(200).json(users);
};

module.exports = { createUser, allUsers };