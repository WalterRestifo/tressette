import { Injectable } from '@angular/core';
import { SessionIdentityDto } from '../models/dtos/sessionIdentity.dto';
import { PlayerEnum } from '../models/enums';

@Injectable({ providedIn: 'root' })
export class SessionIdentityService {
  sessionId = '';
  player = PlayerEnum.Player1;

  set(sessionIdentityData: SessionIdentityDto) {
    this.sessionId = sessionIdentityData.sessionId;
    this.player = sessionIdentityData.player;
  }

  get() {
    return { sessionId: this.sessionId, player: this.player };
  }
}
