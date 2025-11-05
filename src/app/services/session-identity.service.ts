import { Injectable } from '@angular/core';
import { SessionIdentityDtoType } from '../models/dtos/sessionIdentity.dto';
import { PlayerEnum } from '../models/enums';

@Injectable({ providedIn: 'root' })
export class SessionIdentityService {
  sessionId = '';
  player = PlayerEnum.Player1;

  set(sessionIdentityData: SessionIdentityDtoType) {
    this.sessionId = sessionIdentityData.sessionId;
    this.player = sessionIdentityData.player;
  }

  get() {
    return { sessionId: this.sessionId, player: this.player };
  }
}
