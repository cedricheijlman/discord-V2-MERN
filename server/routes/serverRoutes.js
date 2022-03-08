const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/serverControllers");

router.post("/createServer", requireAuth, controller.createServer);

module.exports = router;
