import { Directive, HostListener, Input } from '@angular/core';
import { ActiveShape } from '../interfaces/shape';
import { Board } from '../interfaces/board';
import { ShapeDescension } from '../services/shape-descension';

@Directive({
  selector: '[appUserMechanics]'
})
export class UserMechanics {
  @Input() activeShape?: ActiveShape;
  @Input() board?: Board;

  constructor(private shapeDescension: ShapeDescension) { }

   @HostListener('document:keydown.arrowup', [])
    handleDocumentKeyDown() {
      if (!this.activeShape || !this.board) {
        return;
      }
  
      this.shapeDescension.rotateMatrix90degrees(this.activeShape, this.board);
    }
  
    @HostListener('document:keydown.arrowright', [])
    handleArrowRight() {
      if(!this.activeShape || !this.board) {
        return;
      }
      const {r0, c0} = this.activeShape.position;
      this.shapeDescension.moveActiveShape(this.activeShape, {r0, c0: c0+1}, this.board);
    }
  
    @HostListener('document:keydown.arrowleft', [])
    handleArrowLeft() {
      if(!this.activeShape || !this.board) {
        return;
      }
      const {r0, c0} = this.activeShape.position;
      this.shapeDescension.moveActiveShape(this.activeShape, {r0, c0: c0-1}, this.board);
    }
  
    @HostListener('document:keydown.arrowdown', [])
    handleArrowDown() {
      if(!this.activeShape || !this.board) {
        return;
      }
      const {r0, c0} = this.activeShape.position;
      this.shapeDescension.moveActiveShape(this.activeShape, {r0: r0+1, c0: c0}, this.board);
    }
}
