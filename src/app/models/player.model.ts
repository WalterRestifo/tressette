import { DeckSingleCardDto } from './dtos/deckSingleCard.dto';

export class Player {
  hand: DeckSingleCardDto[] = [];
  name = '';
  isOwnTurn = false;
  inThisTrickPlayedCard: DeckSingleCardDto | undefined;
  points = 0;
  constructor(name: string) {
    this.name = name;
  }
}
