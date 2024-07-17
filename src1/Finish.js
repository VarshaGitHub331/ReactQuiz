import { useQuiz } from "./Contexts/QuizContext.jsx";

export default function Finish() {
  const { state, dispatch } = useQuiz();
  const { points, questions, highscore } = state;
  const total = questions.reduce((sum, ele) => sum + ele.points, 0);
  let emogi;
  const percentage = (points / total) * 100;
  if (percentage === 100) emogi = "😁";
  else if (percentage >= 80 && percentage < 100) emogi = "😊";
  else if (percentage >= 50 && percentage < 80) emogi = "🙂";
  else emogi = "😶";
  return (
    <>
      <div className="result">
        <span>
          {emogi} You scored <strong>{points}</strong> out of{" "}
          <strong>{total}</strong>{" "}
          <strong className="highscore">({Math.ceil(percentage)})%</strong>
        </span>
        <p className="highscore">
          (Highscore: <strong>{highscore}</strong> points)
        </p>
        <br></br>
      </div>
      <button
        className="btn btn-ui"
        onClick={(e) => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}
