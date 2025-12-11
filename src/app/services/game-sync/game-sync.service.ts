import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SessionDto } from '../../models/dtos/session.dto';
import { SessionIdentityDtoType } from '../../models/dtos/sessionIdentity.dto';
import type { DeckSingleCardDtoType } from '../../models/dtos/deckSingleCard.dto';
import { PlayerDtoType } from '../../models/dtos/player.dto';

@Injectable({
  providedIn: 'root',
})
export class GameSyncService {
  constructor(private socket: Socket) {}

  endGame(sessionIdentity: SessionIdentityDtoType) {
    this.socket.emit('endGame', sessionIdentity);
  }

  playCard(
    card: DeckSingleCardDtoType,
    player: PlayerDtoType,
    sessionIdentity: SessionIdentityDtoType
  ) {
    const payload = { card, player, sessionIdentity };
    this.socket.emit('playedCard', payload);
  }

  sendSessionData(sessionData: SessionDto) {
    this.socket.emit('sessionDataSended', sessionData);
  }

  startNewGame(sessionIdentity: SessionIdentityDtoType) {
    this.socket.emit('startNewGame', sessionIdentity);
  }

  getError() {
    return this.socket.fromEvent('error');
  }

  getGameEnded() {
    return this.socket.fromEvent('gameEnded');
  }

  getInitGameData() {
    return this.socket.fromEvent('gameInitialised');
  }

  getNewPlayedCard() {
    return this.socket.fromEvent('newCardPlayed');
  }

  getNewTrickUpdate() {
    return this.socket.fromEvent('newTrickUpdate');
  }
}
