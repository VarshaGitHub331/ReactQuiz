export default function Progress({ index, numq, points, total }) {
  return (
    <header className="progress">
      <progress className="progress-bar" max={numq} value={index} />
      <p>
        Question <strong>{index + 1}</strong>/{numq}
      </p>
      <p>
        <strong>{points}</strong>/{total}
      </p>
    </header>
  );
}
