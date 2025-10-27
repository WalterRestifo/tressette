import { Component, inject, input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Player } from '../../models/player.model';
import { DeckSingleCard } from '../../models/deck-single-card.model';
import { GameSyncService } from '../../services/game-sync.service';

@Component({
  selector: 'app-single-card-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './single-card-dialog.component.html',
})
export class SingleCardDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  gameSync = inject(GameSyncService);
  player = input.required<Player>();

  playSingleCard(cardData: DeckSingleCard) {
    this.dialogRef.close();
    this.gameSync.playCard(cardData, this.player());
  }
}
