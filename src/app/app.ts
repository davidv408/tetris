import { Component } from '@angular/core';
import { TetrisBoard } from './components/board/board';
import { Score } from './components/score/score';
import { GameOverModal } from './components/game-over-modal/game-over-modal';
import { CommonModule } from '@angular/common';
import { StartGameModal } from './components/start-game-modal/start-game-modal';

@Component({
  selector: 'app-root',
  imports: [TetrisBoard, Score, StartGameModal, GameOverModal, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  linesCleared: number = 0;
  gameStarted: boolean = false;
  gameIsOver: boolean = false;

  onStartGame() {
    this.gameStarted = true;
  }

  onGameOver() {
    this.gameIsOver = true;
  }

  onRestartGame() {
    this.linesCleared = 0;
    this.gameStarted = false;
    setTimeout(() => {
      this.gameIsOver = false;
      this.gameStarted = true;
    });
  }
}
