import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckSingleCardComponent } from './deck-single-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CardSuitEnum } from '../../models/enums';
import { mockData, mockPlayer } from '../../models/mocks/mocks';

describe('DeckSingleCardComponent', () => {
  let component: DeckSingleCardComponent;
  let fixture: ComponentFixture<DeckSingleCardComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [DeckSingleCardComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckSingleCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('player', mockPlayer);
    fixture.componentRef.setInput('leadingSuit', CardSuitEnum.Clubs);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
