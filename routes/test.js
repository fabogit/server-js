const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middlewares/jwt.middleware");
const User = require("../models/user.model");

router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

router.get(
  "/all-users",
  authenticateUser,
  async function (request, response, next) {
    try {
      const data = await User.find();
      return response.json({ message: "Users", users: data });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
