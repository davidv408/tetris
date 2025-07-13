import type { Board } from "../interfaces/Board";
import type { ActiveShape, Position, Shape } from "../interfaces/Shape";

const shapes: Shape[] = [
  {
    shape: [
      // Straight
      [1, 1, 1, 1],
    ],
    color: "cyan",
  },
  // Square
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  // T-Shape
  {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "purple",
  },
  {
    shape: [
      // Left Skew
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
  {
    shape: [
      // Right Skew
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
  {
    shape: [
      // Left L-Shape
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "blue",
  },
  {
    shape: [
      // Right L-Shape
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "orange",
  },
];

export function pickNewShape(): ActiveShape {
  const { shape, color } = shapes[Math.floor(Math.random() * shapes.length)];

  // Place the shape (4x4 matrix) at the top of the board (20 x 10)
  const activeShape = {
    position: { r0: 0, c0: 4 },
    shape,
    color,
  };

  return activeShape;
}

function clearActiveShape(
  activeShape: ActiveShape,
  currentBoard: Board,
): Board {
  const { r0, c0 } = activeShape.position;
  const shape = activeShape.shape;

  const newBoard: Board = [];
  for (let row = 0; row < currentBoard.length; row++) {
    newBoard.push([]);
    for (let col = 0; col < currentBoard[row].length; col++) {
      // If cell is where active shape has an initialized cell, then clear it.
      if (
        row >= r0 &&
        row < r0 + shape.length &&
        col >= c0 &&
        col < c0 + shape[0].length &&
        activeShape.shape[row - r0][col - c0] === 1
      ) {
        newBoard[row].push({ value: 0, color: "" });
      } else {
        newBoard[row].push(currentBoard[row][col]);
      }
    }
  }

  return newBoard;
}

export function canDrawActiveShapeAtPosition(
  activeShape: ActiveShape,
  newPosition: Position,
  currentBoard: Board,
): boolean {
  const shape = activeShape.shape;
  const { r0: newR0, c0: newC0 } = newPosition;

  // Check if draw at the new position will out of bounds
  if (
    newR0 + shape.length > currentBoard.length ||
    newC0 < 0 ||
    newC0 + shape[0].length > currentBoard[0].length
  ) {
    return false;
  }
  const newBoard: Board = clearActiveShape(activeShape, currentBoard);

  // Checks if drawing at the new position will collide with any existing shapes
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (newBoard[row + newR0][col + newC0].value + shape[row][col] > 1) {
        return false;
      }
    }
  }

  return true;
}

export function drawActiveShapeAtPosition(
  activeShape: ActiveShape,
  newPosition: Position,
  currentBoard: Board,
): Board {
  const shape = activeShape.shape;
  const { r0, c0 } = newPosition;

  const newBoard: Board = clearActiveShape(activeShape, currentBoard);

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      // If current board already has cell initialized or cell is not part of the active shape, then use that cell value in the new board.
      if (
        newBoard[row][col].value === 1 ||
        !(
          row >= r0 &&
          row < r0 + shape.length &&
          col >= c0 &&
          col < c0 + shape[0].length
        )
      ) {
        newBoard[row][col] = { ...newBoard[row][col] };
      } else {
        const cell = {
          color: shape[row - r0][col - c0] === 1 ? activeShape.color : "",
          value: shape[row - r0][col - c0],
        };
        newBoard[row][col] = cell;
      }
    }
  }

  return newBoard;
}

export function canDrawActiveShapeAsNewShape(
  activeShape: ActiveShape,
  newShape: number[][],
  currentBoard: Board,
): boolean {
  const { r0, c0 } = activeShape.position;

  const newBoard: Board = clearActiveShape(activeShape, currentBoard);

  // Check if draw at the new position will out of bounds
  if (
    r0 + newShape.length > currentBoard.length ||
    c0 + newShape[0].length > currentBoard[0].length
  ) {
    return false;
  }

  // Checks if drawing at the new position will collide with any existing shapes
  for (let row = 0; row < newShape.length; row++) {
    for (let col = 0; col < newShape[row].length; col++) {
      if (newBoard[row + r0][col + c0].value + newShape[row][col] > 1) {
        return false;
      }
    }
  }

  return true;
}

export function drawActiveShapeAsNewShape(
  activeShape: ActiveShape,
  newShape: number[][],
  currentBoard: Board,
): Board {
  const { r0, c0 } = activeShape.position;

  const newBoard: Board = clearActiveShape(activeShape, currentBoard);

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      // If current board already has cell initialized or cell is not part of the active shape, then use that cell value in the new board.
      if (
        newBoard[row][col].value === 1 ||
        !(
          row >= r0 &&
          row < r0 + newShape.length &&
          col >= c0 &&
          col < c0 + newShape[0].length
        )
      ) {
        newBoard[row][col] = { ...newBoard[row][col] };
      } else {
        const cell = {
          color: newShape[row - r0][col - c0] === 1 ? activeShape.color : "",
          value: newShape[row - r0][col - c0],
        };
        newBoard[row][col] = cell;
      }
    }
  }

  return newBoard;
}

export function rotateMatrix90Degrees(matrix: number[][]) {
  const result: number[][] = [];
  // Transpose (swap rows and columns)
  for (let col = 0; col < matrix[0].length; col++) {
    const newColumn = [];
    // Get columns of old array
    for (let row = 0; row < matrix.length; row++) {
      newColumn.push(matrix[row][col]);
    }
    // Push as row to new array
    result.push(newColumn);
  }
  // Reverse each row
  for (let row = 0; row < result.length; row++) {
    result[row].reverse();
  }

  return result;
}
