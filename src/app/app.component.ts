import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckSingleCardComponent } from './components/deck-single-card/deck-single-card.component';
import { concatMap, map, merge, Subscription } from 'rxjs';
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
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgOptimizedImage } from '@angular/common';

// comma as decimal separator
registerLocaleData(localeDe);

@Component({
  selector: 'root',
  imports: [
    RouterOutlet,
    DeckSingleCardComponent,
    MatButtonModule,
    EndGameScreenComponent,
    InitialScreenComponent,
    DecimalPipe,
    NgOptimizedImage,
  ],
  // comma as decimal separator
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('deckRef') deckRef!: ElementRef;
  @ViewChildren('handCardImageRef') handCardImageRef!: QueryList<
    ElementRef<HTMLDivElement>
  >;

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

  get animation1() {
    if (this.player?.name === PlayerEnum.Player1) return 'slide-from-bottom';
    else return 'slide-from-top';
  }

  get animation2() {
    if (this.player?.name === PlayerEnum.Player2) return 'slide-from-bottom';
    else return 'slide-from-top';
  }

  // Create one merged stream because if not the events will not be serialized.
  // The newest event will override the last one without waiting for some timeouts.
  // We need to concatMap the events, to let them be processed one after another.
  gameEvents$ = merge(
    this.gameSync
      .getInitGameData()
      .pipe(map((data) => ({ type: 'initGame', data }))),
    this.gameSync
      .getGameEnded()
      .pipe(map((data) => ({ type: 'gameEnded', data }))),
    this.gameSync
      .getNewPlayedCard()
      .pipe(map((data) => ({ type: 'newPlayedCard', data }))),
    this.gameSync
      .getNewTrickUpdate()
      .pipe(map((data) => ({ type: 'newTrickUpdate', data })))
  );

  ngOnInit(): void {
    const gameEventsSub = this.gameEvents$
      .pipe(
        concatMap(async (event) => {
          const gameDataDto = parseDTO(event.data);

          if (!gameDataDto.success) {
            console.error(gameDataDto.error);
            return;
          }

          switch (event.type) {
            case 'initGame': {
              const { player, gameEnded, currentPlayerName, sessionIdentity } =
                gameDataDto.data;
              this.player = player;
              this.isGameOver = gameEnded;
              this.currentPlayerName = currentPlayerName;
              this.isGameInitialised = true;
              this.sessionIdentitySvc.set(sessionIdentity);
              break;
            }

            case 'gameEnded': {
              const { gameEnded, winner } = gameDataDto.data;

              this.isGameOver = gameEnded;
              this.winner = winner;
              break;
            }

            case 'newPlayedCard': {
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
                this.player = event.data.player;
              }

              //wait few seconds, so that the players can see what cards were played, before the new trick begins
              await new Promise((resolve) => setTimeout(resolve, 2000));
              break;
            }

            case 'newTrickUpdate': {
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

              break;
            }
          }
        })
      )
      .subscribe();

    this.subscriptions.add(gameEventsSub);

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
