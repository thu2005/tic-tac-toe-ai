import React from "react";

function GameInfo({
  winner,
  stepCount,
  onReset,
  difficulty,
  onDifficultyChange,
  scores,
  onResetScores,
  aiMetrics,
  xIsNext,
}) {
  return (
    <div className="game-info">
      <h2>
        Status:{" "}
        {winner === "draw"
          ? "Draw!"
          : winner
          ? `Winner: ${winner}`
          : difficulty === "practice"
          ? `Next: ${xIsNext ? "X" : "O"}`
          : "Playing..."}
      </h2>
      <p>Steps: {stepCount}</p>

      <div className="scoreboard">
        <div className="score-item">
          <div className="score-label">Wins</div>
          <div className="score-value">{scores?.wins ?? 0}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Losses</div>
          <div className="score-value">{scores?.losses ?? 0}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Draws</div>
          <div className="score-value">{scores?.draws ?? 0}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Streak</div>
          <div className="score-value">{scores?.currentStreak ?? 0}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Best Streak</div>
          <div className="score-value">{scores?.bestStreak ?? 0}</div>
        </div>
      </div>

      <button className="reset-scores" onClick={onResetScores}>
        Reset Scores
      </button>

      <div className="difficulty-selector">
        <label>Mode: </label>
        <button
          onClick={() => onDifficultyChange("easy")}
          className={difficulty === "easy" ? "active" : ""}
        >
          Easy
        </button>
        <button
          onClick={() => onDifficultyChange("hard")}
          className={difficulty === "hard" ? "active" : ""}
        >
          Hard
        </button>
        <button
          onClick={() => onDifficultyChange("practice")}
          className={difficulty === "practice" ? "active" : ""}
        >
          Practice
        </button>
      </div>

      <div className="ai-metrics">
        <div className="metric">
          <div className="metric-label">Positions evaluated</div>
          <div className="metric-value">
            {aiMetrics?.positionsEvaluated ?? 0}
          </div>
        </div>
        <div className="metric">
          <div className="metric-label">AI time (ms)</div>
          <div className="metric-value">{aiMetrics?.timeMs ?? 0}</div>
        </div>
      </div>

      <button onClick={onReset}>Reset Game</button>
    </div>
  );
}

export default GameInfo;
