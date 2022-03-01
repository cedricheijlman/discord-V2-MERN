const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

const controller = require("../controllers/friendsControllers");

router.post("/addFriend", controller.addFriend);

router.delete("/deleteFriend", requireAuth, controller.deleteFriend);

router.post("/allFriends", requireAuth, controller.allFriends);

module.exports = router;
