import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DeckSingleCard } from '../models/deck-single-card.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class GameSyncService {
  constructor(private socket: Socket) {}

  playCard(card: DeckSingleCard, player: Player) {
    const payloadToServer = { card, player };

    this.socket.emit('playedCard', payloadToServer);
  }

  getNewPlayedCard() {
    return this.socket.fromEvent('newCardPlayed');
  }

  initGame() {
    this.socket.emit('initGame');
  }

  getInitGameData() {
    return this.socket.fromEvent('gameInitialised');
  }

  startNewGame() {
    this.socket.emit('startNewGame');
  }

  quitGame() {
    this.socket.emit('quitGame');
  }

  getQuitted() {
    return this.socket.fromEvent('gameQuitted');
  }
}
