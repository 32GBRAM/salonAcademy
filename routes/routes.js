const express = require("express");
const { signup, login } = require("../controller/auth");
const {
  isAdmin,
  isStudent,
  isOwner,
} = require("../middleware/auth.middleware");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

router.get("/admin", isAdmin, (req, res) => {
  res.send("welcome to  admin route");
});

router.get("/student", isStudent, (req, res) => {
  res.send("welcome to student route ");
});

router.get("/admin", isOwner, (req, res) => {
  res.send("welcome to  owner route");
});

module.exports = { router };
