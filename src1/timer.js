import { useEffect } from "react";
import { useQuiz } from "./Contexts/QuizContext";
export default function Timer() {
  const { state, dispatch } = useQuiz();
  const { secondsRemaining } = state;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  /*const d = new Date("0:15:60");*/
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "ticks" });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div>
      <strong>
        {minutes}:{seconds}
      </strong>
    </div>
  );
}
