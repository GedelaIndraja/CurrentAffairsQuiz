import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://currentaffairsquiz.onrender.com/api/questions"
      );

      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const toggleWrong = (index) => {
    setWrongAnswers((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const totalQuestions = questions.length;

  const wrongCount = Object.values(wrongAnswers).filter(Boolean).length;

  const score = totalQuestions - wrongCount;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Arial"
      }}
    >
      <h1>Current Affairs Quiz</h1>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "1px solid #ddd"
        }}
      >
        <h3>Total Questions: {totalQuestions}</h3>

        <h3 style={{ color: "#800000" }}>
          Wrong Answers: {wrongCount}
        </h3>

        <h3 style={{ color: "green" }}>
          Score: {score}/{totalQuestions}
        </h3>
      </div>

      {questions.map((q, index) => (
        <QuestionCard
          key={index}
          question={q.question}
          answer={q.answer}
          isWrong={wrongAnswers[index]}
          onWrongChange={() => toggleWrong(index)}
        />
      ))}
    </div>
  );
}

function QuestionCard({
  question,
  answer,
  isWrong,
  onWrongChange
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff"
      }}
    >
      <h3>{question}</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "10px"
        }}
      >
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          style={{
            padding: "8px 14px",
            cursor: "pointer"
          }}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        <label
          style={{
            color: "#800000",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <input
            type="checkbox"
            checked={isWrong || false}
            onChange={onWrongChange}
          />
          Wrong
        </label>
      </div>

      {showAnswer && (
        <p
          style={{
            color: "green",
            fontWeight: "bold",
            marginTop: "12px",
            fontSize:"16px"
          }}
        >
          Answer: {answer}
        </p>
      )}
    </div>
  );
}

export default App;