import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from '@angular/core';
import { Board } from '../../interfaces/board';
import { ShapeDescension } from '../../services/shape-descension';
import { CommonModule } from '@angular/common';
import { ActiveShape } from '../../interfaces/shape';
import { UserMechanics } from '../../directives/user-mechanics';
import { ScoreService } from '../../services/score-service';

@Component({
  selector: 'app-board',
  imports: [CommonModule, UserMechanics],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class TetrisBoard implements OnInit{
  activeShape?: ActiveShape;
  board: Board = Array(24).fill([]).map(() => Array(10).fill({}));

  @Input() linesCleared!: number;
  @Output() linesClearedChange = new EventEmitter<number>();

  constructor(
    private shapeDescension: ShapeDescension,
    private scoreService: ScoreService
  ) {}

  async ngOnInit() {
    for(let row = 0; row < this.board.length; row++) {
      for(let col = 0; col < this.board[row].length; col++) {
        this.board[row][col] = { id: `row${row}col${col}`, color: '', value: 0 }; // Initialize each cell with an empty color
      }
    }

    await this.wait(1000);

   while(true) {
    const { activeShape, board} = this.shapeDescension.pickNewShape(this.board);
    this.activeShape = activeShape;
    this.board = board;
    await this.wait(200);
    let continueDescension = false;

    while(!continueDescension) {
      const {r0, c0} = this.activeShape.position;
      const {activeShape: newActiveShape, board: newBoard, done } = this.shapeDescension.moveActiveShape(this.activeShape, {r0: r0+1, c0}, this.board);

      // Re-intializing the component properties will trigger change detection
      this.activeShape = newActiveShape;
      this.board = newBoard;
      continueDescension = done;
      // Use await to trigger event loop and force change detection to complete
      await this.wait(200);
    }

    // Once shape is in final place, check if any lines can be cleared
    const {linesCleared } = this.scoreService.getLinesCleared(board);
    if (linesCleared > 0) {
      this.linesClearedChange.emit(this.linesCleared + linesCleared);
      await this.wait(200);
    }
   }
  }

  private async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
