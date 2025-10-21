import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameManagerService } from './services/game-manager.service';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DeckSingleCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private gameManager = inject(GameManagerService);
  currentPlayer = this.gameManager.getCurrentPlayer();
  player1 = this.gameManager.player1;
  player2 = this.gameManager.player2;
  private subscriptions = new Subscription();
  title = 'tressette';

  get hand1() {
    return this.player1.hand;
  }
  get hand2() {
    return this.player2.hand;
  }
  get points1() {
    return this.player1.points;
  }
  get points2() {
    return this.player2.points;
  }
  get card1() {
    return this.player1.inThisTrickPlayedCard;
  }
  get card2() {
    return this.player2.inThisTrickPlayedCard;
  }

  ngOnInit(): void {
    const sub = this.player1.$isOwnTurn.subscribe(
      () => (this.currentPlayer = this.gameManager.getCurrentPlayer())
    );

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
