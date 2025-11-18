import { PlayerEnum } from '../../models/enums';
import { mockSessionIdentity } from '../../models/mocks/mocks';
import { SessionIdentityService } from './session-identity.service';

describe('Session identity service', () => {
  let identitySvc: SessionIdentityService;
  beforeEach(() => {
    identitySvc = new SessionIdentityService();
  });

  it('get should return the correct default value', () => {
    const defaultValue = { sessionId: '', player: PlayerEnum.Player1 };
    expect(identitySvc.get()).toEqual(defaultValue);
  });

  it('set should set the correct value', () => {
    identitySvc.set(mockSessionIdentity);
    const response = identitySvc.get();
    expect(response).toEqual(mockSessionIdentity);
  });
});
