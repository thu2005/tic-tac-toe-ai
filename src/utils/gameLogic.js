const calculateWinner = (board) => {
  const winnerSet = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const set of winnerSet) {
    const index1 = set[0];
    const index2 = set[1];
    const index3 = set[2];

    if (
      board[index1] &&
      board[index1] === board[index2] &&
      board[index2] === board[index3]
    ) {
      return board[index1];
    }
  }

  if (!board.includes(null)) {
    return "draw";
  }

  return null;
};

const isDraw = (board) => {
  const winner = calculateWinner(board);
  return winner === "draw";
};

const getAvailableMoves = (board) => {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
};

const isValidMove = (board, index) => {
  return board[index] === null;
};

export { calculateWinner, isDraw, getAvailableMoves, isValidMove };
