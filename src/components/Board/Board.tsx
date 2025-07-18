import { useEffect, useRef, useState, type FC } from "react";
import styles from "./Board.module.css";
import { type ActiveShape } from "../../interfaces/Shape";
import {
  canDrawActiveShapeAsNewShape,
  canDrawActiveShapeAtPosition,
  drawActiveShapeAsNewShape,
  drawActiveShapeAtPosition,
  pickNewShape,
  rotateMatrix90Degrees,
} from "../../utils/ActiveShape";
import { clearLines, getNumCompleteLines } from "../../utils/Score";

interface BoardProps {
  gameIsOver: boolean;
  onGameIsOver: () => void;
}

const Board: FC<BoardProps> = ({ gameIsOver, onGameIsOver }) => {
  const [board, setBoard] = useState(
    Array(20)
      .fill([])
      .map(() => Array(10).fill({ value: 0, color: "" })),
  );
  const [linesCleared, setLinesCleared] = useState(0);
  const activeShape = useRef<ActiveShape>(pickNewShape());
  const keyboardInputQueue = useRef<Array<() => void>>([]);

  useEffect(() => {
    if (gameIsOver) return;
    setBoard((board) =>
      drawActiveShapeAtPosition(
        activeShape.current,
        activeShape.current.position,
        board,
      ),
    );
  }, [gameIsOver]);

  useEffect(() => {
    if (gameIsOver) return;

    // If there is a keyboard input ready, process it in the tick.
    if (keyboardInputQueue.current.length > 0) {
      keyboardInputQueue.current.shift()!();
    }

    // In 200ms, move the active shape down
    const timerId = setInterval(() => {
      moveActiveShape({ rowDelta: 1 });
    }, 200);

    return () => {
      clearInterval(timerId);
    };
  }, [board, gameIsOver]);

  useEffect(() => {
    if (gameIsOver) return;

    // Check if active shape is in its final position, process board for lines that can be cleared and choose a new active
    // shape to draw. Debounced by 400ms to allow keyboard inputs to flush, the debounce will allow the user to queue up
    // movements (e.g. left or right) before the shape is in its final position.
    const timerId = setTimeout(() => {
      const { r0, c0 } = activeShape.current.position;
      const newPosition = { r0: r0 + 1, c0 };
      if (
        !canDrawActiveShapeAtPosition(activeShape.current, newPosition, board)
      ) {
        // Clear any lines on the board.
        setLinesCleared(
          (linesCleared) => linesCleared + getNumCompleteLines(board),
        );
        setBoard(clearLines(board));

        // Check if game is over. If not, pick a new shape to start descending.
        if (activeShape.current.position.r0 === 0) {
          onGameIsOver();
        } else {
          // Pick a new active shape
          activeShape.current = pickNewShape();
          setBoard((board) =>
            drawActiveShapeAtPosition(
              activeShape.current,
              activeShape.current.position,
              board,
            ),
          );
        }
      }
    }, 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [board, gameIsOver, onGameIsOver]);

  useEffect(() => {
    if (gameIsOver) return;

    const onKeyDown = (evt: KeyboardEvent) => {
      switch (evt.key) {
        case "ArrowRight":
          keyboardInputQueue.current.push(() =>
            moveActiveShape({ colDelta: 1 }),
          );
          break;
        case "ArrowLeft":
          keyboardInputQueue.current.push(() =>
            moveActiveShape({ colDelta: -1 }),
          );
          break;
        case "ArrowDown":
          keyboardInputQueue.current.push(() =>
            moveActiveShape({ rowDelta: 1 }),
          );
          break;
        case "ArrowUp":
          keyboardInputQueue.current.push(() => {
            const { r0, c0 } = activeShape.current.position;
            setBoard((board) => {
              const newShape = rotateMatrix90Degrees(activeShape.current.shape);
              // If active shape is in final position (can not descend any further) or can not be drawn using the new shape (because of collisions), then do not apply any state transformations.
              if (
                !canDrawActiveShapeAtPosition(
                  activeShape.current,
                  { r0: r0 + 1, c0 },
                  board,
                ) ||
                !canDrawActiveShapeAsNewShape(
                  activeShape.current,
                  newShape,
                  board,
                )
              ) {
                return board;
              }
              const result = drawActiveShapeAsNewShape(
                activeShape.current,
                newShape,
                board,
              );
              activeShape.current.shape = newShape;
              return result;
            });
          });
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameIsOver]);

  const moveActiveShape = (delta: { rowDelta?: number; colDelta?: number }) => {
    const { rowDelta, colDelta } = delta;
    const { r0, c0 } = activeShape.current.position;
    const newPosition = { r0: r0 + (rowDelta ?? 0), c0: c0 + (colDelta ?? 0) };

    setBoard((board) => {
      if (
        !canDrawActiveShapeAtPosition(activeShape.current, newPosition, board)
      ) {
        return board;
      }
      const result = drawActiveShapeAtPosition(
        activeShape.current,
        newPosition,
        board,
      );
      activeShape.current.position = newPosition;
      return result;
    });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.board} ${gameIsOver ? styles.gameIsOver : ""}`}>
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={styles.row}>
              {row.map((_, colIndex) => {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={styles.cell}
                    style={{ backgroundColor: board[rowIndex][colIndex].color }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      <p>Lines Cleared: {linesCleared}</p>
    </div>
  );
};

export default Board;
