var express = require("express");
var router = express.Router();

var quizController = require("../controller/quiz");

//create a quiz
router.post("/", quizController.createQuiz);

//find a quiz
router.get("/:id", quizController.showQuiz);

//update a quiz
router.put("/:id", quizController.updateQuiz);

module.exports = router;
