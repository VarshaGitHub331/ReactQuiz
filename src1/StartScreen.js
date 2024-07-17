import { useQuiz } from "./Contexts/QuizContext.jsx";

export default function StartScreen() {
  const { state, dispatch } = useQuiz();
  function start() {
    dispatch({ type: "StartQuiz" });
  }
  const { questions } = state;
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h4>{questions.length} questions to test your React mastery</h4>
      <button className="btn" onClick={start}>
        Let's Start
      </button>
    </div>
  );
}
