import { Component } from '@angular/core';
import { TetrisBoard } from './components/board/board';
import { Score } from './components/score/score';
import { GameOverModal } from './components/game-over-modal/game-over-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TetrisBoard, Score, GameOverModal, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  linesCleared: number = 0;
  gameIsOver: boolean = false;
  renderBoard: boolean = true;

  onGameOver() {
    this.gameIsOver = true;
  }

  onRestartGame() {
    this.linesCleared = 0;
    this.renderBoard = false;
    setTimeout(() => {
      this.gameIsOver = false;
      this.renderBoard = true;
    });
  }
}
