import { Injectable } from '@angular/core';
import { DeckClass } from '../models/deck.model';
import { Player } from '../models/player.model';
import { DeckSingleCard } from '../models/deck-single-card.model';
import { CardPointValueEnum, CardSuitEnum } from '../models/enums';
import { BehaviorSubject, filter } from 'rxjs';
import { determineWinnerCard, removeCardFromHand } from './game-manager-utils';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  private deckClassInstance = new DeckClass();
  player1 = new Player('one');
  player2 = new Player('two');
  /**
   * The cards that are in the middle. They are 40 before giving the cards to the players and 20 on the first trick. After every trick every player takes 1 card from the deck until the deck has no cards.
   */
  deck = this.deckClassInstance.deck;
  private $playedCardCount = new BehaviorSubject(0);
  private placeHolderDeckSingleCard = new DeckSingleCard({
    gameValue: 0,
    numberValue: 0,
    pointValue: CardPointValueEnum.None,
    suit: CardSuitEnum.Coins,
    id: -1,
  });
  firstPlayedCard: DeckSingleCard = this.placeHolderDeckSingleCard;
  secondPlayedCard: DeckSingleCard = this.placeHolderDeckSingleCard;
  /**
   * The suit that must be followed in the current trick. This is the suit of the card played by the leading player.
   */
  $leadingSuit = new BehaviorSubject<CardSuitEnum | undefined>(undefined);
  /**
   * The player that won the last trick. If the game just begun, it is player 1.
   */
  private leadingPlayer: Player = this.player1;

  constructor() {
    this.initialiseGame();
    this.$playedCardCount
      .pipe(filter((count) => count === 2))
      .subscribe(() => this.playRound());
  }

  initialiseGame() {
    this.deckClassInstance.initialiseDeck();
    this.deckClassInstance.shuffleDeck();
    this.initialiseFirstRound();
  }

  initialiseFirstRound() {
    this.dealInitialCards();
    // The first player always begin the first round
    this.player1.$isOwnTurn.next(true);
    this.leadingPlayer = this.player1;
  }

  private dealInitialCards() {
    const cardsForPlayer1 = this.deck.splice(0, 10);
    const cardsForPlayer2 = this.deck.splice(0, 10);

    this.player1.hand = cardsForPlayer1;
    this.player2.hand = cardsForPlayer2;
  }

  private async playRound() {
    this.$playedCardCount.next(0);
    let winnerCard;
    if (this.leadingPlayer === this.player1) {
      winnerCard = determineWinnerCard(
        this.player1.inThisTrickPlayedCard!,
        this.player2.inThisTrickPlayedCard!,
        this.$leadingSuit.value!
      );
    } else {
      winnerCard = determineWinnerCard(
        this.player2.inThisTrickPlayedCard!,
        this.player1.inThisTrickPlayedCard!,
        this.$leadingSuit.value!
      );
    }

    //wait 2 seconds, so that the players can see what cards were played, before the new trick begins
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const trickPoints =
      this.player1.inThisTrickPlayedCard!.data.pointValue +
      this.player2.inThisTrickPlayedCard!.data.pointValue;

    if (this.player1.inThisTrickPlayedCard === winnerCard) {
      console.log('player1 wins');
      this.player1.points += trickPoints;
      this.leadingPlayer = this.player1;
      // if player1 wins the trick, it plays first in the next trick
      this.player1.$isOwnTurn.next(true);
      this.player2.$isOwnTurn.next(false);
    } else {
      console.log('player2 wins');
      this.player2.points += trickPoints;
      this.leadingPlayer = this.player2;
      // if player2 wins the trick, it plays first in the next trick
      this.player1.$isOwnTurn.next(false);
      this.player2.$isOwnTurn.next(true);
    }

    // reset everything for the new trick
    this.resetTrick();

    const newCard1 = this.deckClassInstance.takeNewCardFromDeck();
    const newCard2 = this.deckClassInstance.takeNewCardFromDeck();
    if (newCard1) this.player1.hand.push(newCard1);
    if (newCard2) this.player2.hand.push(newCard2);

    // when the players don't have any more card in the hand, the game is over
    if (this.player1.hand.length === 0) this.endGame();
  }

  playCard(card: DeckSingleCard, player: Player) {
    // If it is the first played card in the trick, the card suit becomes the leading suit
    if (this.$playedCardCount.value === 0)
      this.$leadingSuit.next(card.data.suit);
    if (player.name === this.player1.name) {
      this.player1.inThisTrickPlayedCard = card;
      removeCardFromHand(this.player1);
    } else {
      this.player2.inThisTrickPlayedCard = card;
      removeCardFromHand(this.player2);
    }
    this.$playedCardCount.next(this.$playedCardCount.value + 1);
  }

  updateTurn() {
    this.player1.$isOwnTurn.next(!this.player1.$isOwnTurn.value);
    this.player2.$isOwnTurn.next(!this.player2.$isOwnTurn.value);
  }

  getCurrentPlayer() {
    if (this.player1.$isOwnTurn.value) return this.player1;
    else return this.player2;
  }

  resetTrick() {
    this.player1.inThisTrickPlayedCard = undefined;
    this.player2.inThisTrickPlayedCard = undefined;
    this.$leadingSuit.next(undefined);
  }

  //TODO: implement the end of the game
  endGame() {}
}
