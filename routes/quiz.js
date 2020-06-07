var express = require("express");
var router = express.Router();
var auth = require("../util/auth");

var quizController = require("../controller/quiz");

//create a quiz
router.post("/", auth.validateJwt, quizController.createQuiz);

//find a quiz
router.get("/:id", quizController.showQuiz);

//update a quiz
router.put("/:id", auth.validateJwt, quizController.updateQuiz);


router.post("/:id/attempt", auth.allowGuest , auth.validateJwt, quizController.attemptQuiz);

// delete a quiz 








module.exports = router;
