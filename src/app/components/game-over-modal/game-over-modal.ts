import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-over-modal',
  imports: [],
  templateUrl: './game-over-modal.html',
  styleUrl: './game-over-modal.scss'
})
export class GameOverModal {
  @Output() restartGameChange = new EventEmitter<boolean>();

  restartGame() {
    this.restartGameChange.emit(true);
  }
}
