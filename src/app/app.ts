import { Component } from '@angular/core';
import { TetrisBoard } from './components/board/board';
import { Score } from './components/score/score';

@Component({
  selector: 'app-root',
  imports: [TetrisBoard, Score],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  linesCleared: number = 0;
}
