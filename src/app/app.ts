import { Component } from '@angular/core';
import { TetrisBoard } from './components/board/board';

@Component({
  selector: 'app-root',
  imports: [TetrisBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
