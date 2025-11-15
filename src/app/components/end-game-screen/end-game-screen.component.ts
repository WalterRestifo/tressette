import { Component, inject, input } from '@angular/core';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity/session-identity.service';
import { MatButton } from '@angular/material/button';
import { PlayerDtoType } from '../../models/dtos/player.dto';

@Component({
  selector: 'app-end-game-screen',
  imports: [MatButton],
  templateUrl: './end-game-screen.component.html',
  styleUrl: './end-game-screen.component.scss',
})
export class EndGameScreenComponent {
  winner = input<PlayerDtoType | undefined>();
  pointFactor = 3;
  gameSync = inject(GameSyncService);
  sessionIdentitySvc = inject(SessionIdentityService);
  normalizePoints(points: number) {
    return points / this.pointFactor;
  }
  startNewGame() {
    this.gameSync.startNewGame(this.sessionIdentitySvc.get());
  }
}
