const API_URL = "https://ai-quiz-backend-seven.vercel.app/api";

export const fetchQuiz = async (topic) => {
  const res = await fetch(`${API_URL}/generate-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  return res.json();
};

export const fetchFeedback = async (score, total, topic) => {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, total, topic }),
  });
  return res.json();
};
