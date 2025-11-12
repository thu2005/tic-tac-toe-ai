function Square({ value, handleClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "winning" : ""}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default Square;
