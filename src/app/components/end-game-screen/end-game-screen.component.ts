import { Component, inject, input } from '@angular/core';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity/session-identity.service';
import { MatButton } from '@angular/material/button';
import { PlayerDtoType } from '../../models/dtos/player.dto';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'end-game-screen',
  imports: [MatButton, TranslatePipe],
  templateUrl: './end-game-screen.component.html',
  styleUrl: './end-game-screen.component.scss',
})
export class EndGameScreenComponent {
  winner = input<PlayerDtoType | undefined>();
  pointFactor = 3;
  gameSync = inject(GameSyncService);
  sessionIdentitySvc = inject(SessionIdentityService);

  startNewGame() {
    this.gameSync.startNewGame(this.sessionIdentitySvc.get());
  }
}
