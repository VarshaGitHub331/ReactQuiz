export default function StartScreen({ num, onClick }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h4>{num} questions to test your React mastery</h4>
      <button className="btn" onClick={onClick}>
        Let's Start
      </button>
    </div>
  );
}
