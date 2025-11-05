import { PlayerEnum } from '../enums';
import { z } from 'zod';

export const sessionIdentityDto = z.object({
  sessionId: z.string(),
  player: z.enum(PlayerEnum),
});

export type SessionIdentityDtoType = z.infer<typeof sessionIdentityDto>;
