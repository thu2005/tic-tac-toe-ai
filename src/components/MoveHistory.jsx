import React from "react";

function MoveHistory({
  moveHistory,
  currentMoveIndex,
  onMoveSelect,
  sortAscending,
  onToggleSort,
}) {
  // Convert board index to (row, col) format
  const getLocation = (prevBoard, currentBoard) => {
    for (let i = 0; i < 9; i++) {
      if (prevBoard[i] !== currentBoard[i]) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return `(${row}, ${col})`;
      }
    }
    return "";
  };

  // Generate move list with descriptions
  const moves = moveHistory.map((board, moveIndex) => {
    let description;

    if (moveIndex === 0) {
      description = "Go to game start";
    } else {
      const player = moveIndex % 2 === 1 ? "X" : "O";
      const location = getLocation(moveHistory[moveIndex - 1], board);
      description = `Go to move #${moveIndex} (${player} at ${location})`;
    }

    const isCurrentMove = moveIndex === currentMoveIndex;

    return (
      <li key={moveIndex}>
        {isCurrentMove ? (
          <span className="current-move">You are at move #{moveIndex}</span>
        ) : (
          <button
            className="move-button"
            onClick={() => onMoveSelect(moveIndex)}
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  // Sort moves if needed
  const sortedMoves = sortAscending ? moves : moves.slice().reverse();

  return (
    <div className="move-history">
      <div className="history-controls">
        <h3>Move History</h3>
        <button className="sort-toggle" onClick={onToggleSort}>
          Sort: {sortAscending ? "Ascending" : "Descending"}
        </button>
      </div>
      <ol className={sortAscending ? "ascending" : "descending"}>
        {sortedMoves}
      </ol>
    </div>
  );
}

export default MoveHistory;
