import Square from "./Square";

function Board({ board, handleClick, winningLine }) {
  const renderSquare = (index) => {
    return (
      <Square
        key={index}
        value={board[index]}
        handleClick={() => handleClick(index)}
        isWinning={winningLine && winningLine.includes(index)}
      />
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const squares = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        squares.push(renderSquare(index));
      }
      rows.push(
        <div key={row} className="row">
          {squares}
        </div>
      );
    }
    return rows;
  };

  return <div id="board">{renderBoard()}</div>;
}
export default Board;
