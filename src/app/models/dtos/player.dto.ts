import { z } from 'zod';
import { deckSingleCardDto } from './deckSingleCard.dto';
import { PlayerEnum } from '../enums';

export const playerDto = z.object({
  hand: z.array(deckSingleCardDto),
  name: z.enum(PlayerEnum),
  isOwnTurn: z.boolean(),
  inThisTrickPlayedCard: deckSingleCardDto.optional(),
  points: z.number(),
  fromOpponentPlayerLastDrawnCard: deckSingleCardDto.optional(),
});

export type PlayerDtoType = z.infer<typeof playerDto>;
