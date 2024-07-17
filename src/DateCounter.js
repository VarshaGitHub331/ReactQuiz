import { useState, useReducer } from "react";
function reducer(state, action) {
  const { step, count } = state;
  if (action.type === "setStep") {
    return { ...state, step: action.payload };
  }
  if (action.type === "set") {
    return { ...state, count: action.payload };
  }
  if (action.type === "inc") {
    return { ...state, count: count + step };
  } else if (action.type === "dec") {
    return { ...state, count: count - step };
  } else {
    return { ...state, count: 0, step: 1 };
  }
}
function DateCounter() {
  const initialState = { count: 0, step: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
    console.log("inc");
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({ type: "set", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
