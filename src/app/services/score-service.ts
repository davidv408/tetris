import { Injectable } from '@angular/core';
import { Board } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  public getLinesCleared(board: Board): number {
    let allLinesChecked = false;
    let linesCleared = 0;

    while(!allLinesChecked) {
      if(this.clearedLine(board)) {
        linesCleared++;
      } else {
        allLinesChecked = true;
      }
    }

    this.reinitializeIds(board);
    return linesCleared;
  }

  private clearedLine(board: Board) {
    for(let row=board.length-1; row >= 0; row--) {
      if(board[row].every((cell) => cell.value === 1)) {
        
        board.splice(row, 1);
        board.unshift(Array(10).fill({color: '', value: 0}));

        return true;
      }
    }

    return false;
  }

  private reinitializeIds(board: Board) {
    for(let row = 0; row < board.length; row++) {
      for(let col = 0; col < board[row].length; col++) {
        board[row][col] = {...board[row][col], id: `row${row}col${col}`}; // Initialize each cell with an empty color
      }
    }
  }
}
