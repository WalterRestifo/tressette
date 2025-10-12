import { DeckSingleCard } from './deck-single-card.model';
import { CardPointValueEnum, CardSuitEnum } from './enums';
import { cardGameValueMap, cardPointValueMap } from './constants';

export class Deck {
  deck: DeckSingleCard[] = [];
  initialise = this.initialiseDeck();
  shuffle = this.shuffleDeck(this.deck);

  private initialiseDeck() {
    const suits = Object.values(CardSuitEnum);
    suits.map((suit) => {
      for (let cardNumber = 1; cardNumber <= 10; cardNumber++) {
        this.deck.push(
          new DeckSingleCard({
            suit: suit,
            gameValue: cardGameValueMap.get(cardNumber) as number,
            numberValue: cardNumber,
            pointValue: cardPointValueMap.get(cardNumber) as CardPointValueEnum,
          })
        );
      }
    });
  }

  private shuffleDeck(deck: DeckSingleCard[]) {
    let currentIndex = deck.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex],
      ];
    }
  }
}
