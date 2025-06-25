import { Component, EventEmitter, Output } from '@angular/core';
import { BoardModal } from '../board-modal/board-modal';

@Component({
  selector: 'app-start-game-modal',
  imports: [BoardModal],
  templateUrl: './start-game-modal.html',
  styleUrl: './start-game-modal.scss'
})
export class StartGameModal {
  @Output() gameStartedChange = new EventEmitter<boolean>();

  onStartGame() {
    this.gameStartedChange.emit(true);
  }
}
