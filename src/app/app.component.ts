import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { GameSyncService } from './services/game-sync/game-sync.service';
import { EndGameScreenComponent } from './components/end-game-screen/end-game-screen.component';
import { InitialScreenComponent } from './components/initial-screen/initial-screen.component';
import { DeckSingleCardDtoType } from './models/dtos/deckSingleCard.dto';
import { CardSuitEnum, PlayerEnum } from './models/enums';
import { SessionIdentityService } from './services/session-identity/session-identity.service';
import { parseDTO } from './models/dtos/gameData.dto';
import { PlayerDtoType } from './models/dtos/player.dto';
import { parseErrorDTO } from './models/dtos/backendError.dto';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DeckSingleCardComponent,
    MatButtonModule,
    EndGameScreenComponent,
    InitialScreenComponent,
    DecimalPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('deckRef') deckRef!: ElementRef;
  @ViewChildren('handCardImageRef') handCardImageRef!: QueryList<ElementRef>;

  private gameSync = inject(GameSyncService);
  private sessionIdentitySvc = inject(SessionIdentityService);
  isGameOver = false;
  winner: PlayerDtoType | undefined;

  player: PlayerDtoType | undefined;
  currentPlayerName = PlayerEnum.Player1;
  private subscriptions = new Subscription();
  pointFactor = 3;
  isGameInitialised = false;
  inThisTrickPlayedCards: {
    player1?: DeckSingleCardDtoType;
    player2?: DeckSingleCardDtoType;
  } = {};
  leadingSuit: CardSuitEnum | undefined;
  areInitialCardDealed = false;

  get hand() {
    return this.player?.hand;
  }

  get card1() {
    return this.inThisTrickPlayedCards.player1;
  }
  get card2() {
    return this.inThisTrickPlayedCards.player2;
  }

  get isOwnTurn() {
    return this.player?.isOwnTurn;
  }

  get fromOpponentLastDrawnCard() {
    return this.player?.fromOpponentPlayerLastDrawnCard;
  }

  ngOnInit(): void {
    const playedCardSub = this.gameSync
      .getNewPlayedCard()
      .subscribe(async (gameData) => {
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

          if (player.name === this.player?.name) {
            // update the hand of the own player
            this.player = gameData.player;
          }
        } else {
          console.error(gameDataDto.error);
        }

        //wait 2 seconds, so that the players can see what cards were played, before the new trick begins
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });

    this.subscriptions.add(playedCardSub);

    const gameInitialisedSub = this.gameSync
      .getInitGameData()
      .subscribe((gameData) => {
        const gameDataDto = parseDTO(gameData);
        if (gameDataDto.success) {
          // initialize game
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

    const errorSub = this.gameSync.getError().subscribe((error) => {
      const errorDto = parseErrorDTO(error);
      if (errorDto.success) console.error(errorDto.data.message);
      else console.error(errorDto.error);
    });

    this.subscriptions.add(errorSub);
  }

  ngAfterViewChecked() {
    if (this.isGameInitialised && !this.areInitialCardDealed) {
      this.areInitialCardDealed = true; // prevents multiple triggers

      // animate the dealing of the cards
      const deckPos = this.deckRef.nativeElement.getBoundingClientRect();
      this.handCardImageRef.forEach((ref, index) => {
        const position = ref.nativeElement.getBoundingClientRect();
        const deltaY = deckPos.top - position.top;
        const deltaX = deckPos.left - position.left;

        ref.nativeElement.animate(
          [
            {
              transformOrigin: 'top left',
              transform: `translate(${deltaX}px, ${deltaY}px)`,
            },
            {
              transformOrigin: 'top left',
              transform: 'none',
            },
            { transform: 'rotateY(180deg)' },
          ],
          {
            duration: 1200,
            easing: 'linear',
            fill: 'both',
            delay: index * 300, // staggered dealing
          }
        );
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  endGame() {
    this.gameSync.endGame(this.sessionIdentitySvc.get());
  }
}
