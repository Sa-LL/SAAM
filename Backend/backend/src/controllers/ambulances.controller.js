const Models = require("./../models");

async function getAmbulances(res) {
  const ambulances = await Models.ambulancesModel.find();
  res.json(ambulances);
}

async function createAmbulance(ambulance) {
  const newAmbulance = new Models.ambulancesModel(ambulance);
  await newAmbulance.save();
}

async function getAmbulance(ambulance, res) {
  const ambulanceFound = await Models.ambulanceModel.findById(ambulance);
  res.json(ambulanceFound);
}

module.exports = {
  getAmbulances,
  createAmbulance,
  getAmbulance,
};
