import { PlayerEnum } from '../enums';
import { z } from 'zod';

export const sessionIdentityDto = z.object({
  sessionId: z.string(),
  player: z.object({ enumName: z.enum(PlayerEnum), userName: z.string() }),
});

export type SessionIdentityDtoType = z.infer<typeof sessionIdentityDto>;
