import { useState, useEffect } from "react";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import { calculateWinner } from "./utils/gameLogic";
import { getBestMoveAlphaBeta, getRandomMove } from "./utils/ai";
import "./App.css";
import { loadScores, saveScores, resetScoresStorage } from "./utils/storage";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [difficulty, setDifficulty] = useState("hard");
  const [scores, setScores] = useState(() => {
    const saved = loadScores();
    return (
      saved || { wins: 0, losses: 0, draws: 0, currentStreak: 0, bestStreak: 0 }
    );
  });
  const [aiMetrics, setAiMetrics] = useState({
    positionsEvaluated: 0,
    timeMs: 0,
  });

  useEffect(() => {
    const w = calculateWinner(board);
    setWinner(w.winner);
    setWinningLine(w.winningLine);
  }, [board]);

  useEffect(() => {
    // Guard AI move by checking winner directly to avoid race where
    // AI effect runs before winner state updates after a player's move.
    const w = calculateWinner(board);
    if (!xIsNext && !w.winner) {
      const aiResult =
        difficulty === "hard"
          ? getBestMoveAlphaBeta(board)
          : { move: getRandomMove(board), positionsEvaluated: 0, timeMs: 0 };

      const { move, positionsEvaluated, timeMs } = aiResult;
      if (move != null) {
        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
        setXIsNext(true);
        setStepCount((prev) => prev + 1);

        setAiMetrics({ positionsEvaluated, timeMs });
      }
    }
  }, [xIsNext, board, difficulty]);

  useEffect(() => {
    if (!winner) return;
    setScores((prev) => {
      const next = { ...prev };
      if (winner === "draw") {
        next.draws += 1;
        next.currentStreak = 0;
      } else if (winner === "X") {
        next.wins += 1;
        next.currentStreak = prev.currentStreak + 1;
        if (next.currentStreak > prev.bestStreak) {
          next.bestStreak = next.currentStreak;
        }
      } else if (winner === "O") {
        next.losses += 1;
        next.currentStreak = 0;
      }
      saveScores(next);
      return next;
    });
  }, [winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !xIsNext) return; // Block if not player turn
    const newBoard = [...board];
    newBoard[index] = "X"; // Player is always X
    setBoard(newBoard);
    setXIsNext(false); // Switch to AI turn
    setStepCount((prev) => prev + 1);
  };

  const [winningLine, setWinningLine] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
    setStepCount(0);
    setAiMetrics({ positionsEvaluated: 0, timeMs: 0 });
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const resetScores = () => {
    const base = {
      wins: 0,
      losses: 0,
      draws: 0,
      currentStreak: 0,
      bestStreak: 0,
    };
    setScores(base);
    resetScoresStorage();
  };

  return (
    <div className="App">
      <GameInfo
        winner={winner}
        stepCount={stepCount}
        onReset={resetGame}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        scores={scores}
        onResetScores={resetScores}
        aiMetrics={aiMetrics}
      />
      <Board
        board={board}
        handleClick={handleClick}
        winningLine={winningLine}
      />
    </div>
  );
}

export default App;
