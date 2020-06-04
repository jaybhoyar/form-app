var Quiz = require("../models/quiz");
var Question = require("../models/question");
var { isValidQuestion } = require("../util/validatorModule");

module.exports = {
  createQuestion: async (req, res, next) => {
    //find id of the quiz it belongs to
    var question = req.body.question;
    try {
      if (!isValidQuestion(question)) {
        return res.status(400).json({ message: "invalid question" });
      }

      if (!question.quizId) {
        return res.status(404).json({ message: "quiz id not found" });
      }

      var quiz = await Quiz.findById(question.quizId);

      if (!quiz) {
        return res.status(404).json({ message: "quiz doesnt exist in db" });
      }

      var newQuestion = await Question.create(req.body.question);

      quiz.questions.push(newQuestion._id);

      quiz.save();

      res.json({ success: true, question: newQuestion });
    } catch (error) {
      next(error);
    }
  },
  updateQuestion: async (req, res, next) => {
    //extract the question id from req.params
    //use trycatch block to capture any errors
    //validations: (send appropriate respose based on different validations)
    //check if the question exists in req.body
    //use isValidQuestion module to weed out incorrect entries
    //use findByIdAndUpdate and pass in id and data from req.body as parameters
  },
  deleteQuestion: async (req, res, next) => {
    //extract the question id from req.params
    //use trycatch block to capture any errors
    // validations: (send appropriate respose based on different validations)
    
    //remove the question id from the respective quiz

    //use findByIdAndDelete and pass in id
  },
};
