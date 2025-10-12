import { DeckSingleCard } from './deck-single-card.model';

export class Player {
  public hand: DeckSingleCard[] = [];
  name: string = '';
  isOwnTurn: boolean = false;
  public points: number = 0;
  constructor(name: string) {
    this.name = name;
  }
}
