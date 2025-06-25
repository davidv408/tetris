import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardModal } from '../board-modal/board-modal';

@Component({
  selector: 'app-game-over-modal',
  imports: [BoardModal],
  templateUrl: './game-over-modal.html',
  styleUrl: './game-over-modal.scss'
})
export class GameOverModal {
  @Output() restartGameChange = new EventEmitter<boolean>();

  restartGame() {
    this.restartGameChange.emit(true);
  }
}
