import { Injectable } from '@angular/core';
import { Board } from '../interfaces/board';
import { ActiveShape, Shape } from '../interfaces/shape';

@Injectable({
  providedIn: 'root' // Init
})
export class ShapeDescension {
  shapes: Shape[] = [
    [ // Straight
      [1, 1,1,1]
    ],
    // Square
    [
      [1,1],
      [1,1]
    ],
    // T-Shape
    [
      [1,1,1],
      [0,1,0]
    ],
    [ // Skew
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [ // L-Shape
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  ];

  constructor() { }

  public pickNewShape(board: Board): ActiveShape {
    const shape = this.shapes[Math.floor(Math.random()  * this.shapes.length)]; 

    // Place the shape (4x4 matrix) at the top of the board (20 x 10)
    const activeShape = {
      position: {r0: 0, c0: 4},
      shape,
      color: 'blue'
    };

    this.drawActiveShape(activeShape, board);

    return activeShape;
  }

  public rotateMatrix90degrees(activeShape: ActiveShape, board: Board): void {
    // Clear active shape from the board
    this.clearActiveShape(activeShape, board);

    const newShape: number[][] = []
    // Transpose (swap rows and columns)
    for(let col=0; col < activeShape.shape[0].length; col++) {
      const newColumn = [] 
      // Get columns of old array
      for(let row=0; row < activeShape.shape.length; row++) {
        newColumn.push(activeShape.shape[row][col]);
      }
      // Push as row to new array
      newShape.push(newColumn);
    }
    // Reverse each row
    for(let row=0; row < newShape.length; row++) {
      newShape[row].reverse();
    }

    activeShape.shape = newShape

    // Draw shape on board
    this.drawActiveShape(activeShape, board);
  }


  public moveActiveShape(activeShape: ActiveShape, newPosition: {r0: number, c0: number}, board: Board): boolean {
    this.clearActiveShape(activeShape, board);

    // If shape is at the end of the board, then stop the shape descension.
    if (!this.canDrawActiveShape(activeShape, newPosition, board)) {
      this.drawActiveShape(activeShape, board);
      return true;
    }

     // Draw at new position
    activeShape.position = newPosition;
    this.drawActiveShape(activeShape, board);

    return false;
  }

  private clearActiveShape(activeShape: ActiveShape, board: Board): void {
    const {r0, c0} = activeShape.position;
    const shape = activeShape.shape;

    for(let row = 0 ; row < shape.length; row++) {
       for(let col=0; col < shape[row].length; col++) {
        if(shape[row][col] === 1) {
          board[row + r0][col + c0].color = '';
          board[row + r0][col + c0].value = 0;
        }
       }
    }
  }

  private canDrawActiveShape(activeShape: ActiveShape, newPosition: {r0: number, c0: number}, board: Board): boolean {
    const shape = activeShape.shape;
    const {r0, c0} = newPosition;
    const newBoard = structuredClone(board);

    // Check if draw at the new position will out of bounds
    if(r0 + activeShape.shape.length > board.length || c0 < 0 || c0 + shape[0].length > board[0].length) {
      return false
    }

    // Checks if drawing at the new position will collide with any existing shapes or be out of bounds in the board
    for(let row = 0; row < shape.length; row++) {
       for(let col=0; col < shape[row].length; col++) {
        newBoard[row+r0][col+c0].value += shape[row][col];
       }
    }

    for(let row=0; row < newBoard.length; row++) {
      for(let col=0; col < newBoard[row].length; col++) {
        if(newBoard[row][col].value > 1) {
          return false;
        }
      }
    }

    return true;
  }

  private drawActiveShape(activeShape: ActiveShape, board: Board): void {
    const shape = activeShape.shape;
    const {r0, c0} = activeShape.position;

    for(let row = 0; row < shape.length; row++) {
       for(let col=0; col < shape[row].length; col++) {
        if (board[row+r0][col+c0].value === 1) {
          continue;
        }
        board[row+r0][col+c0].color = shape[row][col] === 1 ? activeShape.color : '';
        board[row+r0][col+c0].value = shape[row][col];
       }
    }
  }
}
