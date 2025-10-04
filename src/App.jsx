import React, { useState, useEffect } from "react";
import TopicSelect from "./components/TopicSelect";
import Loader from "./components/Loader";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import ThemeToggle from "./components/ThemeToggle";
import { fetchQuiz, fetchFeedback } from "./utils/api";

export default function App() {
  const [step, setStep] = useState(1); // controls screens 1→2→3→4
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [theme, setTheme] = useState("dark");

  const topics = ["Wellness", "Tech Trends", "History", "Science", "Data Structures", "Object Oriented Programming","Database Management Systems"];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  const startQuiz = async (selectedTopic) => {
    setTopic(selectedTopic);
    setStep(2);
    setLoading(true);

    try {
      const data = await fetchQuiz(selectedTopic);
      setQuestions(data.questions);
      setStep(3);
    } catch {
      alert("Error fetching quiz.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const finishQuiz = async () => {
    let sc = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) sc++;
    });
    setScore(sc);

    try {
      const data = await fetchFeedback(sc, questions.length, topic);
      setFeedback(data.feedback);
    } catch {
      setFeedback("Error generating feedback.");
    }

    setStep(4);
  };

  return (
    <div className="container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="screen-content">
        {step === 1 && <TopicSelect topics={topics} onSelect={startQuiz} />}
        {step === 2 && <Loader />}
        {step === 3 && (
          <Quiz
            questions={questions}
            answers={answers}
            setAnswers={setAnswers}
            onFinish={finishQuiz}
          />
        )}
        {step === 4 && (
          <Result
            score={score}
            total={questions.length}
            feedback={feedback}
            onRestart={() => {
              setStep(1);
              setAnswers({});
              setQuestions([]);
              setScore(null);
              setFeedback("");
            }}
          />
        )}
      </div>
    </div>
  );
}
