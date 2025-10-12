import { Injectable } from '@angular/core';
import { DeckClass } from '../models/deck.model';
import { Player } from '../models/player.model';
import { DeckSingleCard } from '../models/deck-single-card.model';
import { CardPointValueEnum, CardSuitEnum } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  private deckClassInstance = new DeckClass();
  player1 = new Player('one');
  player2 = new Player('two');
  deck = this.deckClassInstance.deck;
  private placeHolderDeckSingleCard = new DeckSingleCard({
    gameValue: 0,
    numberValue: 0,
    pointValue: CardPointValueEnum.None,
    suit: CardSuitEnum.Coins,
  });
  firstPlayedCard: DeckSingleCard = this.placeHolderDeckSingleCard;
  secondPlayedCard: DeckSingleCard = this.placeHolderDeckSingleCard;

  constructor() {
    this.initialiseGame();
    console.log(this.player1.hand);
  }

  initialiseGame() {
    this.deckClassInstance.initialiseDeck();
    this.deckClassInstance.shuffleDeck();
    this.initialiseFirstRound();
  }

  initialiseFirstRound() {
    this.dealInitialCards();
    // The first player always begin the first round
    this.player1.isOwnTurn = true;
  }

  private dealInitialCards() {
    const cardsForPlayer1 = this.deck.splice(0, 10);
    const cardsForPlayer2 = this.deck.splice(0, 10);

    this.player1.hand = cardsForPlayer1;
    this.player2.hand = cardsForPlayer2;
  }

  private playRound(firstCard: DeckSingleCard, secondCard: DeckSingleCard) {}

  playCard(card: DeckSingleCard, player: Player) {}
}
