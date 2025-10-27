import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { Subscription } from 'rxjs';
import { Player } from './models/player.model';
import { MatButtonModule } from '@angular/material/button';
import { GameSyncService } from './services/game-sync.service';
import { DeckSingleCard } from './models/deck-single-card.model';
import { CardPointValueEnum, CardSuitEnum } from './models/enums';
import { EndGameScreenComponent } from './components/end-game-screen/end-game-screen.component';
import { InitialScreenComponent } from './components/initial-screen/initial-screen.component';

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
  isGameOver = false;
  winner: Player | undefined;
  /*   currentPlayer = this.gameManager.getCurrentPlayer();
  isGameOver = this.gameManager.$gameEnded.value;
  player1 = this.gameManager.player1;
  player2 = this.gameManager.player2;
  private subscriptions = new Subscription();
  winner: Player | undefined;
  startNewGame = this.gameManager.startNewGame;
  endGame = this.gameManager.endGame;
  normalizePoints = this.gameManager.normalizePoints; */

  //todo: look if I really need this placeholders
  player1 = new Player('placeholderOne');
  player2 = new Player('placeholderTwo');
  currentPlayer = this.player1;
  private subscriptions = new Subscription();
  pointFactor = 3;
  isGameNotInitialised = true;

  get hand1() {
    return this.player1.hand;
  }
  get hand2() {
    return this.player2.hand;
  }

  get card1() {
    return this.player1.inThisTrickPlayedCard;
  }
  get card2() {
    return this.player2.inThisTrickPlayedCard;
  }

  ngOnInit(): void {
    /*     const turnSub = this.player1.$isOwnTurn.subscribe(
      () => (this.currentPlayer = this.gameManager.getCurrentPlayer())
    );
 */
    //  this.subscriptions.add(turnSub);

    const playedCardSub = this.gameSync
      .getNewPlayedCard()
      .subscribe((payloadFromServer) =>
        console.log('payload coming from server: ', payloadFromServer)
      );

    this.subscriptions.add(playedCardSub);

    const gameInitialisedSub = this.gameSync
      .getInitGameData()
      .subscribe((gameData) => {
        this.player1 = gameData.player1;
        this.player2 = gameData.player2;
        this.isGameOver = gameData.gameEnded;
        this.currentPlayer = gameData.currentPlayer;
        this.isGameNotInitialised = false;

        if (this.isGameOver) {
          if (this.player1.points > this.player2.points) {
            this.winner = this.player1;
          } else if (this.player1.points < this.player2.points) {
            this.winner = this.player2;
          } else this.winner = undefined;
        } else {
          // when starting a new game, the isGameOver will become false again. In that case we need to reset the winner.
          this.winner = undefined;
        }
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

  emitSomething() {
    const someCard = new DeckSingleCard({
      gameValue: 100,
      numberValue: 100,
      pointValue: CardPointValueEnum.Full,
      suit: CardSuitEnum.Coins,
      id: 100,
    });
    this.gameSync.playCard(someCard, this.player1);
  }

  //todo: make a shared util or something, because the same is in endGameScreen component
  normalizePoints(points: number) {
    return points / this.pointFactor;
  }

  quitGame() {
    this.gameSync.quitGame();
  }
}
