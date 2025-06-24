import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverModal } from './game-over-modal';

describe('GameOverModal', () => {
  let component: GameOverModal;
  let fixture: ComponentFixture<GameOverModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOverModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
