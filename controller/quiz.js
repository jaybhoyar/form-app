var Quiz = require("../models/quiz");
var Question = require("../models/question");

var { isValidQuestion } = require("../util/validatorModule");

module.exports = {
  createQuiz: async (req, res, next) => {
    try {
      var title = req.body.quiz.title;
      var questions = req.body.quiz.questions;

      if (!title) {
        return res.status(400).json({ mesasge: "Title is empty" });
      }

      var newQuiz = new Quiz({ title });

      var validQuestions = [];

      questions.forEach((question) => {
        if (isValidQuestion(question)) {
          question.quizId = newQuiz._id;
          validQuestions.push(question);
        }
      });

      var storedQuestions = await Question.insertMany(validQuestions);

      var questionIds = storedQuestions.map((question) => question._id);
      newQuiz.questions = questionIds;

      newQuiz.save().then((quiz) => res.json({ quiz }));
    } catch (error) {
      next(error);
    }
  },
  showQuiz: async (req, res, next) => {
    // extract id from params and store it in a variable
    var quizId = req.params.id;
    //find quiz with Quiz model and findById method (with await)
    try {
      var quiz = await Quiz.findById(quizId).populate("questions");

      //check if the quiz is not null
      if (!quiz) {
        return (
          res
            .status(404)
            //if so respond with proper status
            .json({ success: false, message: "quiz not found or doesnt exist" })
        );
      }
      //if quiz exists then return it
      return res.json({ success: true, quiz });
    } catch (error) {
      next(error);
    }
  },
  updateQuiz: async (req, res, next) => {
    //extract id from params into a variable
    var quizId = req.params.id;
    //use findByIdAndUpdate method to update the title
    try {
      var updatedQuizTitle = await Quiz.findByIdAndUpdate(quizId, {
        title: req.body.quiz.title,
      });
      //respond with appropriate message based on the result
      res.json({ success: true, updatedQuizTitle });
    } catch (error) {
      next(error);
    }
  },
};
