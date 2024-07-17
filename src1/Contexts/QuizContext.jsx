import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();
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

function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(initialState, reducer);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const quizcontext = useContext(QuizContext);
  if (quizcontext === undefined) throw new Error("Context Unkown");
  return quizcontext;
}
export { QuizContextProvider, useQuiz };
