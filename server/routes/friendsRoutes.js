const express = require("express");
const router = express.Router();

const controller = require("../controllers/friendsControllers");

router.post("/addFriend", controller.addFriend);

router.get("/allFriends", controller.allFriends);

module.exports = router;
