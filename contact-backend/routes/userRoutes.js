const express = require("express");
const { registerUser, login, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
//since it is a private use validate token
router.route("/current").get(validateToken, currentUser);


module.exports = router; 