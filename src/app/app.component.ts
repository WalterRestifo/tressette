import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { Subscription } from 'rxjs';
import { Player } from './models/player.model';
import { MatButtonModule } from '@angular/material/button';
import { GameSyncService } from './services/game-sync.service';
import { EndGameScreenComponent } from './components/end-game-screen/end-game-screen.component';
import { InitialScreenComponent } from './components/initial-screen/initial-screen.component';
import { DeckSingleCardDto } from './models/dtos/deckSingleCard.dto';
import { CardSuitEnum, PlayerEnum } from './models/enums';
import { SessionIdentityService } from './services/session-identity.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DeckSingleCardComponent,
    MatButtonModule,
    EndGameScreenComponent,
    InitialScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private gameSync = inject(GameSyncService);
  private sessionIdentitySvc = inject(SessionIdentityService);
  isGameOver = false;
  winner: Player | undefined;
  /*   
  startNewGame = this.gameManager.startNewGame;
  endGame = this.gameManager.endGame;
  normalizePoints = this.gameManager.normalizePoints; */

  //todo: look if I really need this placeholders
  player = new Player('placeholder');
  currentPlayer = this.player;
  private subscriptions = new Subscription();
  pointFactor = 3;
  isGameInitialised = false;
  inThisTrickPlayedCards: {
    player1: DeckSingleCardDto | undefined;
    player2: DeckSingleCardDto | undefined;
  } = { player1: undefined, player2: undefined };
  identity = {
    sessionId: 'placeholder',
    player: PlayerEnum.Player1,
  };
  leadingSuit: CardSuitEnum | undefined;

  get hand() {
    return this.player.hand;
  }

  get card1() {
    return this.inThisTrickPlayedCards.player1;
  }
  get card2() {
    return this.inThisTrickPlayedCards.player2;
  }

  ngOnInit(): void {
    /*     const turnSub = this.player1.$isOwnTurn.subscribe(
      () => (this.currentPlayer = this.gameManager.getCurrentPlayer())
    );
 */
    //  this.subscriptions.add(turnSub);

    const playedCardSub = this.gameSync
      .getNewPlayedCard()
      .subscribe((gameData) => {
        this.isGameOver = gameData.gameEnded;
        this.currentPlayer = gameData.currentPlayer;
        this.winner = gameData.winner;
        this.inThisTrickPlayedCards = gameData.inThisTrickPlayedCards;
        this.leadingSuit = gameData.leadingSuit;
      });

    this.subscriptions.add(playedCardSub);

    const gameInitialisedSub = this.gameSync
      .getInitGameData()
      .subscribe((gameData) => {
        console.log('gameData: ', gameData);
        this.player = gameData.player;
        this.isGameOver = gameData.gameEnded;
        this.currentPlayer = gameData.currentPlayer;
        this.isGameInitialised = true;
        this.winner = gameData.winner;
        this.sessionIdentitySvc.set(gameData.sessionIdentity);
      });

    this.subscriptions.add(gameInitialisedSub);

    const gameQuittedSub = this.gameSync
      .getQuitted()
      .subscribe((isGameQuitted) => {
        this.isGameOver = isGameQuitted;
      });

    this.subscriptions.add(gameQuittedSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  //todo: make a shared util or something, because the same is in endGameScreen component
  normalizePoints(points: number) {
    return points / this.pointFactor;
  }

  quitGame() {
    this.gameSync.quitGame();
  }
}
