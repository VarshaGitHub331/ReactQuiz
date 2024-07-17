import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
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
