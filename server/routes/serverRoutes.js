const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/serverControllers");

router.post("/createServer", requireAuth, controller.createServer);

router.post(
  "/getUserJoinedServers",
  requireAuth,
  controller.getUserJoinedServers
);

router.post("/joinServer", requireAuth, controller.joinServer);

router.post("/openServer", requireAuth, controller.openServer);

module.exports = router;
