const router = require("express").Router();

const Content = require("../models/Content");
const Question = require("../models/Question");

router.post("/", async (req, res) => {

  const { text } = req.body;

  await Content.create({ text });

  const lines = text.split(".");

  for (let line of lines) {

    line = line.trim();

    if (!line) continue;

    const words = line.split(" ");

    if (words.length > 3) {

      const answer = words[0];

      const question =
        `Who is mentioned in: "${line}" ?`;

      const exists =
        await Question.findOne({ question });

      if (!exists) {

        await Question.create({
          question,
          answer
        });

      }
    }
  }

  res.json({
    message: "Content Added"
  });

});

module.exports = router;