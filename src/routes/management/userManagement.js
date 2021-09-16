const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");
const { verifyToken } = require("../../utils/tokenHandler")
router.route("/")
    .get(verifyToken, userController.getUsers)
router.route("/:userId")
    .delete(verifyToken, userController.deleteUser)
    .put(verifyToken, userController.updateUser)

module.exports = router;