import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckSingleCardComponent } from './deck-single-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CardSuitEnum, PlayerEnum } from '../../models/enums';
import { mockCard, mockPlayer } from '../../models/mocks/mocks';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DeckSingleCardComponent', () => {
  let component: DeckSingleCardComponent;
  let fixture: ComponentFixture<DeckSingleCardComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let button: DebugElement;

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
    fixture.componentRef.setInput('data', mockCard);
    fixture.componentRef.setInput('player', mockPlayer);
    fixture.componentRef.setInput('leadingSuit', CardSuitEnum.Clubs);
    fixture.componentRef.setInput('currentPlayerName', PlayerEnum.Player1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not open the dialog, when it is not the own turn to play', () => {
    const anotherPlayer = {
      ...mockPlayer,
      name: PlayerEnum.Player2,
    };
    fixture.componentRef.setInput('player', anotherPlayer);
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click');
    expect(mockDialog.open).not.toHaveBeenCalled();
  });

  it('should not open the dialog, when the suit is not the leading suit and the player has a playable card in the hand', () => {
    const playerWithLeadingSuitCard = {
      ...mockPlayer,
      hand: [...mockPlayer.hand, { ...mockCard, suit: CardSuitEnum.Coins }],
    };
    fixture.componentRef.setInput('player', playerWithLeadingSuitCard);
    fixture.componentRef.setInput('leadingSuit', CardSuitEnum.Coins);
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(mockDialog.open).not.toHaveBeenCalled();
  });

  it('should open the dialog, when the suit is the same of the leading suit', () => {
    button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open the dialog, when the suit is not the leading suit, but there are no playable cards in the hand', () => {
    fixture.componentRef.setInput('leadingSuit', CardSuitEnum.Coins);
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should have the right image background', () => {
    const backgroundImageUrl = `url("img/${mockCard.suit}${mockCard.numberValue}.png")`;
    const picture = fixture.debugElement.query(By.css('button > div'));
    expect(picture.styles['backgroundImage']).toEqual(backgroundImageUrl);
  });
});
