import { z } from 'zod';
import { CardPointValueEnum, CardSuitEnum, PlayerEnum } from '../enums';

const deckSingleCardDto = z.object({
  gameValue: z.number(),
  numberValue: z.number(),
  pointValue: z.enum(CardPointValueEnum),
  suit: z.enum(CardSuitEnum),
  id: z.number(),
});

const playerDto = z.object({
  hand: z.array(deckSingleCardDto),
  name: z.enum(PlayerEnum),
  isOwnTurn: z.boolean(),
  inThisTrickPlayedCard: deckSingleCardDto.optional(),
  points: z.number(),
});

const sessionIdentitDto = z.object({
  sessionId: z.string(),
  player: z.enum(PlayerEnum),
});

const gameDataDto = z.object({
  player: playerDto,
  gameEnded: z.boolean(),
  leadingSuit: z.enum(CardSuitEnum).optional(),
  inThisTrickPlayedCards: z.object({
    player1: deckSingleCardDto.optional(),
    player2: deckSingleCardDto.optional(),
  }),
  currentPlayerName: z.enum(PlayerEnum),
  sessionIdentity: sessionIdentitDto,
  winner: playerDto.optional(),
});

export type UsersDto = z.infer<typeof gameDataDto>;

export function parseDTO(source: unknown) {
  return gameDataDto.safeParse(source);
}
