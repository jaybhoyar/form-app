var express = require("express");
var router = express.Router();

var questionController = require("../controller/question");

//create a question
router.post("/", questionController.createQuestion);

//delete a question
// router.delete("/:id", questionController.deleteQuestion);

// //update a question
// router.put("/:id", questionController.updateQuestion);

module.exports = router;
