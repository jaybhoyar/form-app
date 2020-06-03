var Quiz = require("../models/quiz");
var Question = require("../models/question");

function isValidQuestion(question) {
	var status = true;
	if (
		question.title &&
		question.answers &&
		question.options &&
		question.answers.length &&
		question.options.length == 4
	) {
		question.answers.forEach((answer) => {
			if (!question.options.includes(answer)) {
				status = false;
			}
		});
	} else {
		status = false;
	}

	return status;
}

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

			//
			// push quiz id in question
			// create a question for each question
			// push queston id in quiz
			// send the response

			// take quiz from req.quiz
			// write validation for quiz - checking for title.
			// if not there - return 400
			// new Quiz. - quiz._id
			// take all questions out using req.quiz.questions
			// make a separate function called isValidQuestion
			// loop through all the questions. - check validity using isValidQuestion - n
			// weed out those that are not valid

			// use insertMany to save all questions at once. - DB operation

			// map through to find questionIds - n

			// quiz.questions = questionIds. quiz.save();
		} catch (error) {
			next(error);
		}
	},
};
