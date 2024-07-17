export default function NextButton({ dispatch, index, numq }) {
  return (
    <button
      className="btn btn-ui"
      onClick={(e) => {
        index === numq - 1
          ? dispatch({ type: "finish" })
          : dispatch({ type: "next" });
      }}
    >
      {index === numq - 1 ? "Finish" : "Next"}
    </button>
  );
}
