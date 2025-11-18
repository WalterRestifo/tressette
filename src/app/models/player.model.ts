import { DeckSingleCardDtoType } from './dtos/deckSingleCard.dto';
import { PlayerEnum } from './enums';

export class Player {
  hand: DeckSingleCardDtoType[] = [];
  name = '';
  isOwnTurn = false;
  inThisTrickPlayedCard?: DeckSingleCardDtoType;
  points = 0;
  constructor(name: PlayerEnum) {
    this.name = name;
  }
}
