import React from "react";
import "../styles/Result.css";

export default function Result({ score, total, feedback, onRestart }) {
  return (
    <div className="result">
      <h1>Your Score: {score}/{total}</h1>
      <p>{feedback}</p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}
