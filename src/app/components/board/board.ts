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
export class TetrisBoard implements OnInit {
  activeShape?: ActiveShape;
  board?: Board;

  @Input() linesCleared!: number;
  @Output() linesClearedChange = new EventEmitter<number>();

  @Output() gameOverChange = new EventEmitter<boolean>();

  constructor(
    private shapeDescension: ShapeDescension,
    private scoreService: ScoreService
  ) {}

  async ngOnInit() {
    // Initialize 24 x 10 2D Matrix.
    this.board = Array(24).fill([]).map(() => Array(10).fill({}));
    for(let row = 0; row < this.board.length; row++) {
      for(let col = 0; col < this.board[row].length; col++) {
        this.board[row][col] = { id: `row${row}col${col}`, color: '', value: 0 };
      }
    }

   while(true) {
    // Draw shape at initial position
    this.activeShape = this.shapeDescension.pickNewShape();
    const {r0, c0} = this.activeShape.position;
    let inFinalPosition = this.shapeDescension.moveActiveShape(this.activeShape, {r0: r0, c0}, this.board);
    await this.wait(200);

    // If shape is not in it's final position, move it down one line
    while(!inFinalPosition) {
       const {r0, c0} = this.activeShape.position;
      inFinalPosition = this.shapeDescension.moveActiveShape(this.activeShape, {r0: r0+1, c0}, this.board);
      await this.wait(200);
    }

    // Once shape is in final place, check if any lines can be cleared
    const linesCleared = this.scoreService.getLinesCleared(this.board);
    if (linesCleared > 0) {
      this.linesClearedChange.emit(this.linesCleared + linesCleared);
      await this.wait(200);
    }

    // If active shape is still in original position, then game is over
    if (this.activeShape.position.r0 === 0) {
      this.gameOverChange.emit(true);
      break;
    }
   }
  }

  /**
   * Use await to trigger event loop and force change detection to complete.
   * @param ms 
   * @returns 
   */
  private async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
