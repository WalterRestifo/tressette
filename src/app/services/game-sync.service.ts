import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DeckSingleCardType } from '../models/deck-single-card.model';
import { Player } from '../models/player.model';
import { SessionDto } from '../models/dtos/session.dto';
import { SessionIdentityDto } from '../models/dtos/sessionIdentity.dto';

@Injectable({
  providedIn: 'root',
})
export class GameSyncService {
  constructor(private socket: Socket) {}

  playCard(
    card: DeckSingleCardType,
    player: Player,
    sessionIdentity: SessionIdentityDto
  ) {
    const payloadToServer = { card, player, sessionIdentity };
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

  quitGame(sessionData: SessionIdentityDto) {
    this.socket.emit('quitGame', sessionData);
  }

  getGameEnded() {
    return this.socket.fromEvent('gameEnded');
  }

  sendSessionData(sessionData: SessionDto) {
    this.socket.emit('sessionDataSended', sessionData);
  }

  getError() {
    return this.socket.fromEvent('error');
  }

  getNewTrickUpdate() {
    return this.socket.fromEvent('newTrickUpdate');
  }
}
