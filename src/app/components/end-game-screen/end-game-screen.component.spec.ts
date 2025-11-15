import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameScreenComponent } from './end-game-screen.component';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity/session-identity.service';
import { mockPlayer } from '../../models/mocks/mocks';
import { By } from '@angular/platform-browser';

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

  it('should show the name of the winner, if there is one', () => {
    fixture.componentRef.setInput('winner', mockPlayer);
    fixture.detectChanges();
    const winnerTag = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(winnerTag.textContent).toBe('PLAYER1 won!');
  });

  it('should show that there is no winner, when the game is quitted before ending the game', () => {
    const winnerTag = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(winnerTag.textContent).toBe('There is no winner.');
  });

  it('should start a new game, when the button to play again is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(mockGameSyncSvc.startNewGame).toHaveBeenCalledWith(
      mockSessionIdentitySvc.get()
    );
  });
});
