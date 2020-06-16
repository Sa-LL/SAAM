const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  names: String,
  lastNames: String,
  password: String,
  email: String,
  cellPhone: Number,
});

const usersModel = mongoose.model("users", users);

const ambulances = new Schema({
  licensePlate: String,
  names: String,
  lastNames: String,
  cellPhone: Number,
});

const ambulancesModel = mongoose.model("ambulances", ambulances);

module.exports = {
  usersModel,
  ambulancesModel,
};
