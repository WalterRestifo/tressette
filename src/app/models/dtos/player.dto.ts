import { z } from 'zod';
import { deckSingleCardDto } from './deckSingleCard.dto';
import { playerName } from './playerName.dto';

export const playerDto = z.object({
  hand: z.array(deckSingleCardDto),
  name: playerName,
  isOwnTurn: z.boolean(),
  inThisTrickPlayedCard: deckSingleCardDto.optional(),
  points: z.number(),
  fromOpponentPlayerLastDrawnCard: deckSingleCardDto.optional(),
});

export type PlayerDtoType = z.infer<typeof playerDto>;
