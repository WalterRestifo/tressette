import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameScreenComponent } from './end-game-screen.component';

describe('EndGameScreenComponent', () => {
  let component: EndGameScreenComponent;
  let fixture: ComponentFixture<EndGameScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndGameScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
