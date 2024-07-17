export default function Question({ question, dispatch, answer }) {
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((ele, i, arr) => (
          <button
            className={`btn btn-option ${i + 1 === answer ? "answer" : " "} ${
              answer != null
                ? i + 1 === question.correctOption
                  ? "correct"
                  : "wrong"
                : " "
            }`}
            onClick={(e) => {
              dispatch({ type: "updateAnswer", payload: i + 1 });
            }}
            disabled={answer != null}
          >
            {ele}
          </button>
        ))}
      </div>

    </div>
  );
}
