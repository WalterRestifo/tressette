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
  currentPlayerName = PlayerEnum.Player1;
  private subscriptions = new Subscription();
  pointFactor = 3;
  isGameInitialised = false;
  inThisTrickPlayedCards: {
    player1: DeckSingleCardDto | undefined;
    player2: DeckSingleCardDto | undefined;
  } = { player1: undefined, player2: undefined };
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
    const playedCardSub = this.gameSync
      .getNewPlayedCard()
      .subscribe((gameData) => {
        this.isGameOver = gameData.gameEnded;
        this.currentPlayerName = gameData.currentPlayerName;
        this.inThisTrickPlayedCards = gameData.inThisTrickPlayedCards;
        this.leadingSuit = gameData.leadingSuit;

        if (gameData.player.name === this.player.name) {
          // update the hand of the own player
          this.player = gameData.player;
        }
      });

    this.subscriptions.add(playedCardSub);

    const gameInitialisedSub = this.gameSync
      .getInitGameData()
      .subscribe((gameData) => {
        this.player = gameData.player;
        this.isGameOver = gameData.gameEnded;
        this.currentPlayerName = gameData.currentPlayerName;
        this.isGameInitialised = true;
        this.sessionIdentitySvc.set(gameData.sessionIdentity);
      });

    this.subscriptions.add(gameInitialisedSub);

    const gameEndedSub = this.gameSync.getGameEnded().subscribe((gameData) => {
      this.isGameOver = gameData.gameEnded;
      this.winner = gameData.winner;
    });

    this.subscriptions.add(gameEndedSub);

    const newTrickUpdateSub = this.gameSync
      .getNewTrickUpdate()
      .subscribe((gameData) => {
        this.isGameOver = gameData.gameEnded;
        this.currentPlayerName = gameData.currentPlayerName;
        this.inThisTrickPlayedCards = gameData.inThisTrickPlayedCards;
        this.leadingSuit = gameData.leadingSuit;
        this.winner = gameData.winner;
        this.player = gameData.player;
      });

    this.subscriptions.add(newTrickUpdateSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  //todo: make a shared util or something, because the same is in endGameScreen component
  normalizePoints(points: number) {
    return points / this.pointFactor;
  }

  endGame() {
    this.gameSync.endGame(this.sessionIdentitySvc.get());
  }
}
