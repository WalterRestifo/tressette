import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GameManagerService } from '../../services/game-manager.service';
import { Player } from '../../models/player.model';
import { DeckSingleCard } from '../../models/deck-single-card.model';

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
  player: Player;

  constructor(private gameManager: GameManagerService) {
    if (this.gameManager.player1.isOwnTurn)
      this.player = this.gameManager.player1;
    else this.player = this.gameManager.player2;
  }

  playSingleCard(cardData: DeckSingleCard) {
    this.dialogRef.close();
    this.gameManager.playCard(cardData, this.player);
    this.gameManager.updateTurn();
  }
}
