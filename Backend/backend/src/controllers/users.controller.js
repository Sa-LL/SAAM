const Models = require("./../models");

async function getUsers(res) {
  const users = await Models.usersModel.find();
  res.json(users);
}

async function createUser(user) {
  const newUser = new Models.usersModel(user);
  await newUser.save();
}

async function getUser(user, res) {
  const userFound = await Models.usersModel.findById(user);
  res.json(userFound);
}

module.exports = {
  getUsers,
  createUser,
  getUser,
};
