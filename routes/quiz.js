var express = require("express");
var router = express.Router();

var quizController = require("../controller/quiz");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});
router.post("/", quizController.createQuiz);
module.exports = router;
