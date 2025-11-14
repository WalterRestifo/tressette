import { Socket } from 'ngx-socket-io';
import { GameSyncService } from './game-sync.service';
import { TestBed } from '@angular/core/testing';

describe('Game sync service', () => {
  let mockSocket: Socket;
  let svc: GameSyncService;

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
  });

  it('should be created', () => {
    expect(svc).toBeTruthy();
  });
});
