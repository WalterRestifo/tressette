import { DeckSingleCard } from './deck-single-card.model';

export class Player {
  hand: DeckSingleCard[] = [];
  name: string = '';
  isOwnTurn: boolean = false;
  inThisTrickPlayedCard: DeckSingleCard | undefined;
  points: number = 0;
  constructor(name: string) {
    this.name = name;
  }
}
