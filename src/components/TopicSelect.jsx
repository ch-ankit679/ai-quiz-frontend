import React from "react";
import "../styles/TopicSelect.css";

export default function TopicSelect({ topics, onSelect }) {
  return (
    <div className="topic-select">
      <h1>Select a Topic</h1>
      {topics.map((topic, idx) => (
        <button key={idx} onClick={() => onSelect(topic)}>
          {topic}
        </button>
      ))}
    </div>
  );
}
