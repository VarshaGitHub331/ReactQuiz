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
const initialState = {
  questions: [],
  /*loading,error,ready,active,finish*/ status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved": {
      return { ...state, status: "ready", questions: action.payload };
    }
    case "dataFailed": {
      return { ...state, status: "error", questions: [] };
    }
    case "StartQuiz": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    }
    case "updateAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "next": {
      return {
        ...state,
        answer: null,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finish",
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
    }
    case "restart": {
      return {
        ...state,
        status: "ready",
        answer: null,
        points: 0,
        index: 0,
        secondsRemaining: 10,
      };
    }
    case "ticks": {
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining === 0 ? 0 : state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finish" : state.status,
      };
    }
    default:
      throw new Error("Unknown Action");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numq = questions.length;
  const total = questions.reduce((sum, ele) => sum + ele.points, 0);
  function start() {
    dispatch({ type: "StartQuiz" });
  }

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
  }, []);
  return (
    <div className="app">
      <Header />
      {status === "active" && (
        <Progress numq={numq} points={points} index={index} total={total} />
      )}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen num={numq} onClick={start} />}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            {answer && (
              <NextButton dispatch={dispatch} index={index} numq={numq} />
            )}
          </>
        )}
        {status === "finish" && (
          <Finish
            points={points}
            total={total}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <Timer
            dispatch={dispatch}
            secondsRemaining={secondsRemaining}
            status={status}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
