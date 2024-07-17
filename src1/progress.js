import { useQuiz } from "./Contexts/QuizContext.jsx";

export default function Progress() {
  const { state, dispatch } = useQuiz();
  const { index, questions, points } = state;
  const total = questions.reduce((total, ele) => total + ele.points, 0);
  return (
    <header className="progress">
      <progress className="progress-bar" max={questions.length} value={index} />
      <p>
        Question <strong>{index + 1}</strong>/{questions.length}
      </p>
      <p>
        <strong>{points}</strong>/{total}
      </p>
    </header>
  );
}
