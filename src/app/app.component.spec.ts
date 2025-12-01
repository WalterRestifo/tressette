import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameSyncService } from './services/game-sync/game-sync.service';
import { SessionIdentityService } from './services/session-identity/session-identity.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { mockGameData, mockPlayer } from './models/mocks/mocks';
import { EndGameScreenComponent } from './components/end-game-screen/end-game-screen.component';
import { InitialScreenComponent } from './components/initial-screen/initial-screen.component';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';

describe('AppComponent', () => {
  let mockGameSyncSvc: jasmine.SpyObj<GameSyncService>;
  let mockSessionIdentitySvc: jasmine.SpyObj<SessionIdentityService>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    mockGameSyncSvc = jasmine.createSpyObj('GameSyncService', [
      'getNewPlayedCard',
      'getInitGameData',
      'getGameEnded',
      'getNewTrickUpdate',
      'endGame',
      'getError',
    ]);
    mockSessionIdentitySvc = jasmine.createSpyObj('SessionIdentityService', [
      'get',
      'set',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        EndGameScreenComponent,
        InitialScreenComponent,
        RouterOutlet,
        MatButtonModule,
        DeckSingleCardComponent,
      ],
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
    mockGameSyncSvc.getNewPlayedCard.and.returnValue(of());
    mockGameSyncSvc.getInitGameData.and.returnValue(of());
    mockGameSyncSvc.getNewTrickUpdate.and.returnValue(of());
    mockGameSyncSvc.getGameEnded.and.returnValue(of());
    mockGameSyncSvc.getError.and.returnValue(of());
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the end game screen', () => {
    component.isGameOver = true;
    fixture.detectChanges();

    const winnerTag = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(winnerTag.textContent).toBe('There is no winner.');
  });

  it('should render the initial screen', () => {
    const heading = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(heading.textContent).toBe('Tressette Online');
  });

  it('should render the UI elements', () => {
    component.player = mockPlayer;
    component.isGameInitialised = true;
    fixture.detectChanges();

    const turnTag = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(turnTag.textContent).toBe("It's your turn");

    const pointsTag = fixture.debugElement.query(
      By.css('#points')
    ).nativeElement;
    expect(pointsTag.textContent).toBe('Your points: 00.0');

    const opponentsLastDrawnCard = fixture.debugElement.query(
      By.css('#opponents-last-drawn-card')
    );
    expect(opponentsLastDrawnCard).toBeTruthy();

    const quitBtn = fixture.debugElement.query(
      By.css('#quit-btn')
    ).nativeElement;
    expect(quitBtn.textContent).toBe(' quit game ');

    const cardListElements = fixture.debugElement.queryAll(By.css('li'));
    expect(cardListElements).toHaveSize(mockPlayer.hand.length);
  });
});
