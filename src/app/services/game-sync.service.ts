import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DeckSingleCard } from '../models/deck-single-card.model';
import { Player } from '../models/player.model';
import { SessionDto } from '../models/dtos/session.dto';

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

  sendSessionData(sessionData: SessionDto) {
    this.socket.emit('sessionDataSended', sessionData);
  }

  getError() {
    return this.socket.fromEvent('error');
  }
}
