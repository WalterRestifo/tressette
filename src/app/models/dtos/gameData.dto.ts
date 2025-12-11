import { z } from 'zod';
import { CardSuitEnum, PlayerEnum } from '../enums';
import { deckSingleCardDto } from './deckSingleCard.dto';
import { playerDto } from './player.dto';
import { sessionIdentityDto } from './sessionIdentity.dto';

const gameDataDto = z.object({
  player: playerDto,
  gameEnded: z.boolean(),
  leadingSuit: z.enum(CardSuitEnum).optional(),
  inThisTrickPlayedCards: z.object({
    player1: deckSingleCardDto.optional(),
    player2: deckSingleCardDto.optional(),
  }),
  currentPlayerName: z.object({
    enumName: z.enum(PlayerEnum),
    userName: z.string(),
  }),
  sessionIdentity: sessionIdentityDto,
  winner: playerDto.optional(),
});

export type GameDataDto = z.infer<typeof gameDataDto>;

export function parseDTO(source: unknown) {
  return gameDataDto.safeParse(source);
}
