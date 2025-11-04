import { Component, inject, input } from '@angular/core';
import { Player } from '../../models/player.model';
import { GameSyncService } from '../../services/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-end-game-screen',
  imports: [MatButton],
  templateUrl: './end-game-screen.component.html',
  styleUrl: './end-game-screen.component.scss',
})
export class EndGameScreenComponent {
  winner = input<Player | undefined>();
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
