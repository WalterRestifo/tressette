import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameScreenComponent } from './end-game-screen.component';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity/session-identity.service';

describe('EndGameScreenComponent', () => {
  let component: EndGameScreenComponent;
  let fixture: ComponentFixture<EndGameScreenComponent>;
  let mockGameSyncSvc: jasmine.SpyObj<GameSyncService>;
  let mockSessionIdentitySvc: jasmine.SpyObj<SessionIdentityService>;

  beforeEach(async () => {
    mockGameSyncSvc = jasmine.createSpyObj('GameSyncService', ['startNewGame']);
    mockSessionIdentitySvc = jasmine.createSpyObj('SessionIdentityService', [
      'get',
    ]);

    await TestBed.configureTestingModule({
      imports: [EndGameScreenComponent],
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

    fixture = TestBed.createComponent(EndGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
