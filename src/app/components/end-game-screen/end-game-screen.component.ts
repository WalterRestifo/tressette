import { Component, inject, input } from '@angular/core';
import { Player } from '../../models/player.model';
import { GameSyncService } from '../../services/game-sync.service';

@Component({
  selector: 'app-end-game-screen',
  imports: [],
  templateUrl: './end-game-screen.component.html',
  styleUrl: './end-game-screen.component.scss',
})
export class EndGameScreenComponent {
  winner = input<Player | undefined>();
  pointFactor = 3;
  gameSync = inject(GameSyncService);
  normalizePoints(points: number) {
    return points / this.pointFactor;
  }
  startNewGame() {
    this.gameSync.startNewGame();
  }
}
