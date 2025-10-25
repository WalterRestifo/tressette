import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameManagerService } from './services/game-manager.service';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { Subscription } from 'rxjs';
import { Player } from './models/player.model';
import { MatButtonModule } from '@angular/material/button';
import { GameSyncService } from './services/game-sync.service';
import { DeckSingleCard } from './models/deck-single-card.model';
import { CardPointValueEnum, CardSuitEnum } from './models/enums';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DeckSingleCardComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private gameManager = inject(GameManagerService);
  private gameSync = inject(GameSyncService);
  currentPlayer = this.gameManager.getCurrentPlayer();
  isGameOver = this.gameManager.$gameEnded.value;
  player1 = this.gameManager.player1;
  player2 = this.gameManager.player2;
  private subscriptions = new Subscription();
  winner: Player | undefined;
  startNewGame = this.gameManager.startNewGame;
  endGame = this.gameManager.endGame;
  normalizePoints = this.gameManager.normalizePoints;

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
    const turnSub = this.player1.$isOwnTurn.subscribe(
      () => (this.currentPlayer = this.gameManager.getCurrentPlayer())
    );

    this.subscriptions.add(turnSub);

    const endGameSub = this.gameManager.$gameEnded.subscribe(() => {
      this.isGameOver = this.gameManager.$gameEnded.value;
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

    this.subscriptions.add(endGameSub);

    const playedCardSub = this.gameSync
      .getNewPlayedCard()
      .subscribe(() => console.log('test'));

    this.subscriptions.add(playedCardSub);
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
    this.gameSync.playCard(someCard);
  }
}
