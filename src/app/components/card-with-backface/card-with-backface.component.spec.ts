import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithBackfaceComponent } from './card-with-backface.component';

describe('CardWithBackfaceComponent', () => {
  let component: CardWithBackfaceComponent;
  let fixture: ComponentFixture<CardWithBackfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithBackfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWithBackfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
