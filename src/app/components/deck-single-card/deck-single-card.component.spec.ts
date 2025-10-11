import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckSingleCardComponent } from './deck-single-card.component';

describe('DeckSingleCardComponent', () => {
  let component: DeckSingleCardComponent;
  let fixture: ComponentFixture<DeckSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckSingleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
