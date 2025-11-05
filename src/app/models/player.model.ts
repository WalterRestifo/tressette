import { DeckSingleCardDtoType } from './dtos/deckSingleCard.dto';

export class Player {
  hand: DeckSingleCardDtoType[] = [];
  name = '';
  isOwnTurn = false;
  inThisTrickPlayedCard?: DeckSingleCardDtoType;
  points = 0;
  constructor(name: string) {
    this.name = name;
  }
}
