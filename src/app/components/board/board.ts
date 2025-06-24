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
    this.activeShape = this.shapeDescension.pickNewShape(this.board);
    await this.wait(200);

    let inFinalPosition = false;
    do {
      const {r0, c0} = this.activeShape.position;
      inFinalPosition = this.shapeDescension.moveActiveShape(this.activeShape, {r0: r0+1, c0}, this.board);
      await this.wait(200);
    } while (!inFinalPosition)

    // Once shape is in final place, check if any lines can be cleared
    const {linesCleared } = this.scoreService.getLinesCleared(this.board);
    if (linesCleared > 0) {
      this.linesClearedChange.emit(this.linesCleared + linesCleared);
      await this.wait(200);
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
