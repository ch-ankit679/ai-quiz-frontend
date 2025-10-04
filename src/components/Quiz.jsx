import React, { useState } from "react";
import "../styles/Quiz.css";

export default function Quiz({ questions, answers, setAnswers, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (optionIndex) => {
    if (showAnswer) return; // prevent double click
    setSelectedOption(optionIndex);
    setShowAnswer(true);

    setAnswers({ ...answers, [current]: optionIndex });
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  const question = questions[current];

  return (
    <div className="quiz">
      <div className="question-header">
        <p>
          Question {current + 1}/{questions.length}
        </p>
        <progress value={current + 1} max={questions.length}></progress>
      </div>

      <h2>{question.q}</h2>

      <div className="options">
        {question.options.map((opt, idx) => {
          let className = "";
          if (showAnswer) {
            if (idx === question.correct) className = "correct";
            else if (idx === selectedOption && idx !== question.correct)
              className = "wrong";
          } else if (answers[current] === idx) {
            className = "selected";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={className}
              disabled={showAnswer}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="navigation">
        <button className="prev" onClick={handlePrev} disabled={current === 0}>
          Previous
        </button>
        {current === questions.length - 1 ? (
          <button className="finish" onClick={onFinish}>
            Finish
          </button>
        ) : (
          <button className="next" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
