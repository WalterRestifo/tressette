import { Component, inject, input } from '@angular/core';
import { DeckSingleCardType } from '../../models/deck-single-card.model';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SingleCardDialogComponent } from '../single-card-dialog/single-card-dialog.component';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-deck-single-card',
  imports: [MatCardModule],
  templateUrl: './deck-single-card.component.html',
})
export class DeckSingleCardComponent {
  checkIfPlayable: () => boolean;

  data = input.required<DeckSingleCardType>();

  dialog = inject(MatDialog);

  constructor(gameManager: GameManagerService) {
    const checkIfPlayable = () => {
      const player = gameManager.getCurrentPlayer();
      const hand = player.hand;
      // If the first card of the trick was not yet played, every card can be played
      if (gameManager.$leadingSuit.value === undefined) return true;

      // If the player has some card of the same suit, he must follow the trick suit
      const hasSameSuitCards = hand.some(
        (card) => card.data.suit === gameManager.$leadingSuit.value
      );

      // If the player has no cards of the leading suit, he can play every card
      if (
        !hasSameSuitCards ||
        this.data().suit === gameManager.$leadingSuit.value
      ) {
        return true;
      } else {
        return false;
      }
    };
    gameManager.$leadingSuit.subscribe(() => checkIfPlayable());
    this.checkIfPlayable = checkIfPlayable;
  }

  get numberValue() {
    return this.data().numberValue;
  }

  get suit() {
    return this.data().suit;
  }

  openDialog(isPlayable: boolean) {
    if (!isPlayable) return;

    const dialogRef = this.dialog.open(SingleCardDialogComponent, {
      // This data is part of the dialog API of angular material
      data: {
        // This data is needed because type DeckSingleCard needs data (like prop) TODO: rename it to prop or something similar
        data: {
          numberValue: this.numberValue,
          suit: this.suit,
          gameValue: this.data().gameValue,
          pointValue: this.data().pointValue,
          id: this.data().id,
        },
      },
    });
  }
}
