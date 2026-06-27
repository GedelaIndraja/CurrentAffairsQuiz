const router = require("express").Router();

const Question = require("../models/Question");

router.get("/", async (req, res) => {

  const questions = await Question.aggregate([
    { $sample: { size: 20 } }
  ]);

  res.json(questions);

});

module.exports = router;