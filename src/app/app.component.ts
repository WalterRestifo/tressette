import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameManagerService } from './services/game-manager.service';
import { Player } from './models/player.model';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DeckSingleCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tressette';
  player1: Player = new Player('placeholder');
  player2: Player = new Player('Placeholder');
  currentPlayer: Player;

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

  constructor(private gameManager: GameManagerService) {
    this.player1 = gameManager.player1;
    this.player2 = gameManager.player2;
    this.currentPlayer = gameManager.getCurrentPlayer();
    // make the subscription to the own turn of a player (it is not relevant, what player)
    this.player1.$isOwnTurn.subscribe(
      () => (this.currentPlayer = gameManager.getCurrentPlayer())
    );
  }
}
