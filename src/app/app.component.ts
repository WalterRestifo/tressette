import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { Subscription } from 'rxjs';
import { Player } from './models/player.model';
import { MatButtonModule } from '@angular/material/button';
import { GameSyncService } from './services/game-sync.service';
import { EndGameScreenComponent } from './components/end-game-screen/end-game-screen.component';
import { InitialScreenComponent } from './components/initial-screen/initial-screen.component';
import { DeckSingleCardDtoType } from './models/dtos/deckSingleCard.dto';
import { CardSuitEnum, PlayerEnum } from './models/enums';
import { SessionIdentityService } from './services/session-identity.service';
import { parseDTO } from './models/dtos/gameData.dto';

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

  player = new Player('placeholder');
  currentPlayerName = PlayerEnum.Player1;
  private subscriptions = new Subscription();
  pointFactor = 3;
  isGameInitialised = false;
  inThisTrickPlayedCards: {
    player1?: DeckSingleCardDtoType;
    player2?: DeckSingleCardDtoType;
  } = {};
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
        const gameDataDto = parseDTO(gameData);
        if (gameDataDto.success) {
          const {
            gameEnded,
            currentPlayerName,
            inThisTrickPlayedCards,
            leadingSuit,
            player,
          } = gameDataDto.data;

          this.isGameOver = gameEnded;
          this.currentPlayerName = currentPlayerName;
          this.inThisTrickPlayedCards = inThisTrickPlayedCards;
          this.leadingSuit = leadingSuit;

          if (player.name === this.player.name) {
            // update the hand of the own player
            this.player = gameData.player;
          }
        } else {
          console.error(gameDataDto.error);
        }
      });

    this.subscriptions.add(playedCardSub);

    const gameInitialisedSub = this.gameSync
      .getInitGameData()
      .subscribe((gameData) => {
        const gameDataDto = parseDTO(gameData);
        if (gameDataDto.success) {
          const { player, gameEnded, currentPlayerName, sessionIdentity } =
            gameDataDto.data;
          this.player = player;
          this.isGameOver = gameEnded;
          this.currentPlayerName = currentPlayerName;
          this.isGameInitialised = true;
          this.sessionIdentitySvc.set(sessionIdentity);
        } else {
          console.error(gameDataDto.error);
        }
      });

    this.subscriptions.add(gameInitialisedSub);

    const gameEndedSub = this.gameSync.getGameEnded().subscribe((gameData) => {
      const gameDataDto = parseDTO(gameData);
      if (gameDataDto.success) {
        const { gameEnded, winner } = gameDataDto.data;

        this.isGameOver = gameEnded;
        this.winner = winner;
      } else {
        console.error(gameDataDto.error);
      }
    });

    this.subscriptions.add(gameEndedSub);

    const newTrickUpdateSub = this.gameSync
      .getNewTrickUpdate()
      .subscribe((gameData) => {
        const gameDataDto = parseDTO(gameData);
        if (gameDataDto.success) {
          const {
            gameEnded,
            currentPlayerName,
            inThisTrickPlayedCards,
            leadingSuit,
            winner,
            player,
          } = gameDataDto.data;

          this.isGameOver = gameEnded;
          this.currentPlayerName = currentPlayerName;
          this.inThisTrickPlayedCards = inThisTrickPlayedCards;
          this.leadingSuit = leadingSuit;
          this.winner = winner;
          this.player = player;
        } else {
          console.error(gameDataDto.error);
        }
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
