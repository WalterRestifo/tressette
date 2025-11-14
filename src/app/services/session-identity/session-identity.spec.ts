import { PlayerEnum } from '../../models/enums';
import { SessionIdentityService } from './session-identity.service';

describe('Session identity service', () => {
  let identitySvc: SessionIdentityService;
  beforeEach(() => {
    identitySvc = new SessionIdentityService();
  });

  it('getValue should return the correct default Value', () => {
    const defaultValue = { sessionId: '', player: PlayerEnum.Player1 };
    expect(identitySvc.get()).toEqual(defaultValue);
  });
});
