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
      data: {
        numberValue: this.numberValue,
        suit: this.suit,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
