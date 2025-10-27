import { calculateWinner, getAvailableMoves } from "./gameLogic.js";

const minimaxAlphaBeta = (board, depth, alpha, beta, isMaximizing, metrics) => {
  metrics.positionsEvaluated++;
  const winner = calculateWinner(board);

  if (winner === "X") {
    return -10 + depth;
  } else if (winner === "O") {
    return 10 - depth;
  } else if (winner === "draw") {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "O";
        const evalScore = minimaxAlphaBeta(
          newBoard,
          depth + 1,
          alpha,
          beta,
          false,
          metrics
        );
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "X";
        const evalScore = minimaxAlphaBeta(
          newBoard,
          depth + 1,
          alpha,
          beta,
          true,
          metrics
        );
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
};

function getBestMoveAlphaBeta(board) {
  const metrics = { positionsEvaluated: 0 };
  const t0 =
    typeof performance !== "undefined" && performance.now
      ? performance.now()
      : Date.now();

  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = "O";
      const score = minimaxAlphaBeta(
        newBoard,
        0,
        -Infinity,
        Infinity,
        false,
        metrics
      );
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  const t1 =
    typeof performance !== "undefined" && performance.now
      ? performance.now()
      : Date.now();
  return {
    move,
    positionsEvaluated: metrics.positionsEvaluated,
    timeMs: Math.round(t1 - t0),
  };
}

const getRandomMove = (board) => {
  const availableMoves = getAvailableMoves(board);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

export { getBestMoveAlphaBeta, getRandomMove };
