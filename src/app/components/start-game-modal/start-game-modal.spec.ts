import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameModal } from './start-game-modal';

describe('StartGameModal', () => {
  let component: StartGameModal;
  let fixture: ComponentFixture<StartGameModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartGameModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartGameModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
