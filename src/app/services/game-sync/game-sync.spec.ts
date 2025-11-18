import { Socket } from 'ngx-socket-io';
import { GameSyncService } from './game-sync.service';
import { TestBed } from '@angular/core/testing';
import {
  mockCard,
  mockGameData,
  mockPlayer,
  mockSessionData,
  mockSessionIdentity,
} from '../../models/mocks/mocks';
import { of } from 'rxjs';

describe('Game sync service', () => {
  let mockSocket: jasmine.SpyObj<Socket>;
  let svc: GameSyncService;
  const card = mockCard;
  const player = mockPlayer;
  const sessionData = mockSessionData;
  const sessionIdentity = mockSessionIdentity;
  const $mockResponse = of(mockGameData);

  beforeEach(() => {
    mockSocket = jasmine.createSpyObj('Socket', ['fromEvent', 'emit']);
    TestBed.configureTestingModule({
      providers: [
        GameSyncService,
        {
          provide: Socket,
          useValue: mockSocket,
        },
      ],
    });
    svc = TestBed.inject(GameSyncService);
    mockSocket.fromEvent.and.returnValue($mockResponse);
  });

  it('should be created', () => {
    expect(svc).toBeTruthy();
  });

  it('should send the correct data with endGame', () => {
    svc.endGame(sessionIdentity);
    expect(mockSocket.emit).toHaveBeenCalledOnceWith(
      'endGame',
      sessionIdentity
    );
  });

  it('should send the correct data with playCard', () => {
    svc.playCard(card, player, sessionIdentity);
    const payload = { card, player, sessionIdentity };
    expect(mockSocket.emit).toHaveBeenCalledOnceWith('playedCard', payload);
  });

  it('should send the correct data with sendSessionData', () => {
    svc.sendSessionData(sessionData);
    expect(mockSocket.emit).toHaveBeenCalledOnceWith(
      'sessionDataSended',
      sessionData
    );
  });

  it('should send the correct data with startNewGame', () => {
    svc.startNewGame(sessionIdentity);
    expect(mockSocket.emit).toHaveBeenCalledOnceWith(
      'startNewGame',
      sessionIdentity
    );
  });

  it('should receive the correct data with getError', () => {
    const $errors = svc.getError();
    expect($errors).toBe($mockResponse);
  });

  it('should receive the correct data with getGameEnded', () => {
    const $gameEnded = svc.getGameEnded();
    expect($gameEnded).toBe($mockResponse);
  });

  it('should receive the correct data with getInitGameData', () => {
    const $gameInitialised = svc.getInitGameData();
    expect($gameInitialised).toBe($mockResponse);
  });

  it('should receive the correct data with getNewPlayedCard', () => {
    const $newPlayedCard = svc.getNewPlayedCard();
    expect($newPlayedCard).toBe($mockResponse);
  });

  it('should receive the correct data with getNewTrickUpdate', () => {
    const $newTrickUpdates = svc.getNewTrickUpdate();
    expect($newTrickUpdates).toBe($mockResponse);
  });
});
