import z from 'zod';
import { PlayerEnum } from '../enums';

export const playerName = z.object({
  enumName: z.enum(PlayerEnum),
  userName: z.string(),
});

export type PlayerNameDtoType = z.infer<typeof playerName>;
