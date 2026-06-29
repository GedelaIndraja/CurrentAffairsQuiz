import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/questions"
    );

    setQuestions(res.data);
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>Current Affairs Quiz</h1>

      {questions.map((q, index) => (
        <QuestionCard
          key={index}
          question={q.question}
          answer={q.answer}
        />
      ))}

    </div>
  );
}

function QuestionCard({ question, answer }) {

  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: 20,
        marginBottom: 20,
        borderRadius: 10
      }}
    >

      <h3>{question}</h3>

      <button onClick={() => setShow(!show)}>

        {show
          ? "Hide Answer"
          : "Show Answer"}

      </button>

      {show && (
        <p style={{ color: "green" }}>
          {answer}
        </p>
      )}

    </div>
  );
}

export default App;