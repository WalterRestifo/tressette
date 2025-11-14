import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from '../../models/player.model';
import { SessionDto } from '../../models/dtos/session.dto';
import { SessionIdentityDtoType } from '../../models/dtos/sessionIdentity.dto';
import type { DeckSingleCardDtoType } from '../../models/dtos/deckSingleCard.dto';

@Injectable({
  providedIn: 'root',
})
export class GameSyncService {
  constructor(private socket: Socket) {}

  playCard(
    card: DeckSingleCardDtoType,
    player: Player,
    sessionIdentity: SessionIdentityDtoType
  ) {
    const payload = { card, player, sessionIdentity };
    this.socket.emit('playedCard', payload);
  }

  getNewPlayedCard() {
    return this.socket.fromEvent('newCardPlayed');
  }

  getInitGameData() {
    return this.socket.fromEvent('gameInitialised');
  }

  startNewGame(sessionIdentity: SessionIdentityDtoType) {
    this.socket.emit('startNewGame', sessionIdentity);
  }

  endGame(sessionIdentity: SessionIdentityDtoType) {
    this.socket.emit('endGame', sessionIdentity);
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
