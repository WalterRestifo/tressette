import { Component, inject, input } from '@angular/core';
import { DeckSingleCardType } from '../../models/deck-single-card.model';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SingleCardDialogComponent } from '../single-card-dialog/single-card-dialog.component';

@Component({
  selector: 'app-deck-single-card',
  imports: [MatCardModule],
  templateUrl: './deck-single-card.component.html',
})
export class DeckSingleCardComponent {
  data = input.required<DeckSingleCardType>();

  dialog = inject(MatDialog);

  get numberValue() {
    return this.data().numberValue;
  }

  get suit() {
    return this.data().suit;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SingleCardDialogComponent, {
      // This data is part of the dialog API of angular material
      data: {
        // This data is needed because type DeckSingleCard needs data (like prop) TODO: rename it to prop or something similar
        data: {
          numberValue: this.numberValue,
          suit: this.suit,
          gameValue: this.data().gameValue,
          pointValue: this.data().pointValue,
        },
      },
    });
  }
}
