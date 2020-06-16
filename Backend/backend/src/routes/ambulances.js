const { Router } = require("express");
const router = Router();

const {
  getAmbulances,
  createAmbulance,
  getAmbulance,
} = require("./../controllers/ambulances.controller");

router.get("/", (req, res) => {
  getAmbulances(res);
});

router.get("/:id", (req, res) => {
  getAmbulance(req.params.id, res);
});

router.post("/", (req, res) => {
  createAmbulances();
});

module.exports = router;
