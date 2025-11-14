import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlayerEnum, SessionTypeEnum } from '../../models/enums';
import { SessionDto } from '../../models/dtos/session.dto';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-initial-screen',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './initial-screen.component.html',
  styleUrl: './initial-screen.component.scss',
})
export class InitialScreenComponent {
  private syncService = inject(GameSyncService);
  readonly sessionType = SessionTypeEnum;
  readonly sessionControl = new FormControl(SessionTypeEnum.New, {
    nonNullable: true,
  });
  readonly sessionIdControl = new FormControl('', { nonNullable: true });
  sessionSignal = toSignal(this.sessionControl.valueChanges, {
    initialValue: this.sessionControl.value,
  });
  readonly playerSignal = computed(() => {
    return this.sessionSignal() === SessionTypeEnum.New
      ? PlayerEnum.Player1
      : PlayerEnum.Player2;
  });
  form = new FormGroup({
    session: this.sessionControl,
    sessionId: this.sessionIdControl,
  });

  onSubmit() {
    const sessionDto: SessionDto = {
      sessionId: this.sessionIdControl.value,
      sessionType: this.sessionControl.value,
      player: this.playerSignal(),
    };

    this.syncService.sendSessionData(sessionDto);
  }
}
