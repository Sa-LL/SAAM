const { Router } = require("express");
const router = Router();

const {
  getUsers,
  getUser,
  createUser,
} = require("./../controllers/users.controller");

router.get("/", (req, res) => {
  getUsers(res);
});

router.get("/:id", (req, res) => {
  getUser(req.params.id, res);
});

router.post("/", (req, res) => {
  createUser(req.body);
});

module.exports = router;
