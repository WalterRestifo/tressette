import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DeckSingleCard } from '../models/deck-single-card.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class GameSyncService {
  constructor(private socket: Socket) {}

  playCard(card: DeckSingleCard) {
    this.socket.emit('playedCard', card);
  }

  getNewPlayedCard() {
    return this.socket.fromEvent('newCardPlayed');
  }
}
