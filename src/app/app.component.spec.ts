import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameSyncService } from './services/game-sync/game-sync.service';
import { SessionIdentityService } from './services/session-identity/session-identity.service';

describe('AppComponent', () => {
  let mockGameSyncSvc: jasmine.SpyObj<GameSyncService>;
  let mockSessionIdentitySvc: jasmine.SpyObj<SessionIdentityService>;

  beforeEach(async () => {
    mockGameSyncSvc = jasmine.createSpyObj('GameSyncService', [
      'getNewPlayedCard',
      'getInitGameData',
      'getGameEnded',
      'getNewTrickUpdate',
      'endGame',
    ]);
    mockSessionIdentitySvc = jasmine.createSpyObj('SessionIdentityService', [
      'get',
      'set',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: GameSyncService,
          useValue: mockGameSyncSvc,
        },
        {
          provide: SessionIdentityService,
          useValue: mockSessionIdentitySvc,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
