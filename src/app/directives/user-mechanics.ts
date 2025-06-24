import { Directive, HostListener, Input } from '@angular/core';
import { ActiveShape } from '../interfaces/shape';
import { Board } from '../interfaces/board';
import { ShapeDescension } from '../services/shape-descension';

@Directive({
  selector: '[appUserMechanics]'
})
export class UserMechanics {
  @Input() activeShape!: ActiveShape;
  @Input() board!: Board;

  constructor(private shapeDescension: ShapeDescension) { }

   @HostListener('document:keydown.arrowup', [])
    handleDocumentKeyDown() {  
      this.shapeDescension.rotateMatrix90degrees(this.activeShape, this.board);
    }
  
    @HostListener('document:keydown.arrowright', [])
    handleArrowRight() {
      const {r0, c0} = this.activeShape.position;
      this.shapeDescension.moveActiveShape(this.activeShape, {r0, c0: c0+1}, this.board);
    }
  
    @HostListener('document:keydown.arrowleft', [])
    handleArrowLeft() {
      const {r0, c0} = this.activeShape.position;
      this.shapeDescension.moveActiveShape(this.activeShape, {r0, c0: c0-1}, this.board);
    }
  
    @HostListener('document:keydown.arrowdown', [])
    handleArrowDown() {
      const {r0, c0} = this.activeShape.position;
      this.shapeDescension.moveActiveShape(this.activeShape, {r0: r0+1, c0: c0}, this.board);
    }
}
