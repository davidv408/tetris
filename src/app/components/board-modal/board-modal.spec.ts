import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModal } from './board-modal';

describe('BoardModal', () => {
  let component: BoardModal;
  let fixture: ComponentFixture<BoardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
