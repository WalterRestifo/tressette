import { BehaviorSubject } from 'rxjs';
import { DeckSingleCard } from './deck-single-card.model';

export class Player {
  hand: DeckSingleCard[] = [];
  name = '';
  isOwnTurn = false;
  inThisTrickPlayedCard: DeckSingleCard | undefined;
  points = 0;
  constructor(name: string) {
    this.name = name;
  }
}
