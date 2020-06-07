var express = require("express");
var router = express.Router();
var userController = require("../controller/user");

var auth = require("../util/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register
router.post("/", userController.registerUser);

//login
router.post("/login", userController.loginUser);

//update
router.put("/",auth.validateJwt, userController.updateUser);

module.exports = router;
