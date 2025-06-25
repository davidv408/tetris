import { Directive, HostListener, Input } from '@angular/core';
import { ActiveShape } from '../interfaces/shape';
import { Board } from '../interfaces/board';
import { ActiveShapeService } from '../services/active-shape-service';

@Directive({
  selector: '[appUserMechanics]'
})
export class UserMechanics {
  @Input() activeShape!: ActiveShape;
  @Input() board!: Board;

  constructor(private activeShapeService: ActiveShapeService) { }

   @HostListener('document:keydown.arrowup', [])
    handleDocumentKeyDown() {  
      this.activeShapeService.rotateMatrix90degrees(this.activeShape, this.board);
    }
  
    @HostListener('document:keydown.arrowright', [])
    handleArrowRight() {
      const {r0, c0} = this.activeShape.position;
      this.activeShapeService.moveActiveShape(this.activeShape, {r0, c0: c0+1}, this.board);
    }
  
    @HostListener('document:keydown.arrowleft', [])
    handleArrowLeft() {
      const {r0, c0} = this.activeShape.position;
      this.activeShapeService.moveActiveShape(this.activeShape, {r0, c0: c0-1}, this.board);
    }
  
    @HostListener('document:keydown.arrowdown', [])
    handleArrowDown() {
      const {r0, c0} = this.activeShape.position;
      this.activeShapeService.moveActiveShape(this.activeShape, {r0: r0+1, c0: c0}, this.board);
    }
}
