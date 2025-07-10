import type { Board, Cell } from "../interfaces/Board";

export function getNumCompleteLines(board: Board): number {
  let completeLines = 0;

  const stack: Cell[][] = [];
  for (const row of board) {
    stack.push(row);

    while (stack[stack.length - 1].every((cell) => cell.value === 1)) {
      completeLines++;
      stack.pop();
    }
  }

  return completeLines;
}

export function clearLines(board: Board): Board {
  let linesCleared = 0;

  const stack: Cell[][] = [];
  for (const row of board) {
    stack.push(row);

    while (
      stack.length > 0 &&
      stack[stack.length - 1].every((cell) => cell.value === 1)
    ) {
      linesCleared++;
      stack.pop();
    }
  }

  const result = [
    ...Array(linesCleared).fill(Array(10).fill({ value: 0, color: "" })),
    ...stack,
  ];

  return result;
}
