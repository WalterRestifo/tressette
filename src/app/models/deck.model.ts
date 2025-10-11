import { DeckSingleCard } from './deck-single-card.model';
import { CardPointValueEnum, CardSuitEnum } from './enums';
import { cardGameValueMap, CardPointValueMap } from './constants';

export class Deck {
  deck: DeckSingleCard[] = [];
  initialise = this.initialiseDeck();

  private initialiseDeck() {
    const suits = Object.values(CardSuitEnum);
    suits.map((suit) => {
      for (let cardNumber = 1; cardNumber <= 10; cardNumber++) {
        this.deck.push(
          new DeckSingleCard({
            suit: suit,
            gameValue: cardGameValueMap.get(cardNumber) as number,
            numberValue: cardNumber,
            pointValue: CardPointValueMap.get(cardNumber) as CardPointValueEnum,
          })
        );
      }
    });
  }
}
