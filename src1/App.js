import "./App.css";
import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./progress.js";
import Finish from "./Finish.js";
import Timer from "./timer.js";
import { QuizContextProvider, useQuiz } from "./Contexts/QuizContext.jsx";

function App() {
  const { state, dispatch } = useQuiz();
  const { status, answer } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:8000/questions");
        const res = await data.json();
        console.log(res);
        dispatch({ type: "dataRecieved", payload: res });
      } catch (e) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="app">
      <Header />
      {status === "active" && <Progress />}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Question />
            {answer && <NextButton />}
          </>
        )}
        {status === "finish" && <Finish />}
        {status === "active" && <Timer />}
      </Main>
    </div>
  );
}

export default App;
