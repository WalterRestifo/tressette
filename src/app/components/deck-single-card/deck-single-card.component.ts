import { Component, effect, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SingleCardDialogComponent } from '../single-card-dialog/single-card-dialog.component';
import { CardSuitEnum, PlayerEnum } from '../../models/enums';
import { DeckSingleCardDtoType } from '../../models/dtos/deckSingleCard.dto';
import { PlayerDtoType } from '../../models/dtos/player.dto';

@Component({
  selector: 'app-deck-single-card',
  imports: [MatCardModule],
  templateUrl: './deck-single-card.component.html',
})
export class DeckSingleCardComponent {
  data = input<DeckSingleCardDtoType>();

  dialog = inject(MatDialog);

  isDisabled = input<boolean>();
  player = input.required<PlayerDtoType>();
  leadingSuit = input.required<CardSuitEnum | undefined>();
  currentPlayerName = input<PlayerEnum>();

  isPlayable = signal(false);

  get backgroundImageUrl(): string {
    return `url('img/${this.suit}${this.numberValue}.png')`;
  }

  private checkIfPlayable() {
    const ownName = this.player().name;
    const hand = this.player().hand;
    const leadingSuit = this.leadingSuit();
    const suit = this.data()?.suit;

    if (this.currentPlayerName() !== ownName) return false;

    // Sometimes a card should only be shown, like for the opponents last drawn card.
    if (this.isDisabled()) return false;

    // If the first card of the trick was not yet played, every card can be played
    if (leadingSuit === undefined) return true;

    // If the player has some card of the same suit, he must follow the trick suit
    const hasSameSuitCards = hand.some((card) => card.suit === leadingSuit);

    // If the player has no cards of the leading suit, he can play every card
    if (!hasSameSuitCards || suit === leadingSuit) {
      return true;
    } else {
      return false;
    }
  }

  constructor() {
    effect(() => {
      this.isPlayable.set(this.checkIfPlayable());
    });
  }

  get numberValue() {
    return this.data()?.numberValue;
  }

  get suit() {
    return this.data()?.suit;
  }

  openDialog() {
    if (!this.isPlayable()) return;

    const dialogRef = this.dialog.open(SingleCardDialogComponent, {
      // This data is part of the dialog API of angular material
      data: {
        // This data is needed because type DeckSingleCard needs data (like prop) TODO: rename it to prop or something similar
        data: {
          numberValue: this.numberValue,
          suit: this.suit,
          gameValue: this.data()?.gameValue,
          pointValue: this.data()?.pointValue,
          id: this.data()?.id,
        },
        player: this.player(),
      },
    });
  }
}
