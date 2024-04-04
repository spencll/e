import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: ncols }, () => createRow());
    // TODO: create array-of-arrays of true/false values
    // ncols sets number of arrays in array
    // nrows sets number of cells per array
    // chanceLightStartsOn sets chance cell is lit for the whole board
    // Generate array of nrow booleans
    // [[f, f, f], [t, t, f], [f, f, f]]
    function createRow() {
      return Array.from(
        { length: nrows },
        () => Math.random() < chanceLightStartsOn
      );
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // Checks if every cell of every row is true
    return board.every((row) => row.every((cell) => cell === true));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      // oldBoard is array, go through each row and spread into same row
      const newBoard = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip specified cell
      flipCell(y, x, newBoard);

      // surrounding cells
      flipCell(y + 1, x, newBoard); // Flip cell below
      flipCell(y - 1, x, newBoard); // Flip cell above
      flipCell(y, x + 1, newBoard); // Flip cell to the right
      flipCell(y, x - 1, newBoard); // Flip cell to the left

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You win!</div>;
  }
  // TODO

  // make table board using array
  return (
    <div className="Board">
      {board.map((row, rowIndex) => (
        <div className="Board-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              //  runs function based on cell position
              flipCellsAroundMe={() =>
                flipCellsAround(`${rowIndex}-${colIndex}`)
              }
              isLit={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
  // TODO
}

export default Board;
