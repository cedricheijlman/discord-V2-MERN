const express = require("express");
const router = express.Router();

const controller = require("../controllers/authControllers");

router.post("/register", controller.postRegister);

router.post("/login", controller.postLogin);

router.post("/validateUser", controller.validateUser);

module.exports = router;
