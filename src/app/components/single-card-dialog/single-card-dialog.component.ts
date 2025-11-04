import { Component, inject, input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GameSyncService } from '../../services/game-sync.service';
import { Player } from '../../models/player.model';
import { SessionIdentityService } from '../../services/session-identity.service';
import { DeckSingleCardDto } from '../../models/dtos/deckSingleCard.dto';

type DialogData = {
  data: DeckSingleCardDto;
  player: Player;
};

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
  data: DialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  gameSync = inject(GameSyncService);
  sessionIdentitySvc = inject(SessionIdentityService);
  player = this.data.player;

  playSingleCard(cardData: DeckSingleCardDto) {
    this.dialogRef.close();
    this.gameSync.playCard(
      cardData,
      this.player,
      this.sessionIdentitySvc.get()
    );
  }
}
