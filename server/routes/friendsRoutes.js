const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

const controller = require("../controllers/friendsControllers");

router.post("/addFriend", requireAuth, controller.addFriend);

router.post("/allFriendRequests", requireAuth, controller.allFriendRequests);

router.delete("/deleteFriend", requireAuth, controller.deleteFriend);

router.post("/allFriends", requireAuth, controller.allFriends);

module.exports = router;
