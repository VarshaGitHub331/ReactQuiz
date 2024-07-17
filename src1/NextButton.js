import { useQuiz } from "./Contexts/QuizContext";

export default function NextButton() {
  const { state, dispatch } = useQuiz();
  const { index, questions } = state;
  return (
    <button
      className="btn btn-ui"
      onClick={(e) => {
        index === questions.length - 1
          ? dispatch({ type: "finish" })
          : dispatch({ type: "next" });
      }}
    >
      {index === questions.length - 1 ? "Finish" : "Next"}
    </button>
  );
}
