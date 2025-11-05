import { CardPointValueEnum, CardSuitEnum } from '../enums';
import { z } from 'zod';

export const deckSingleCardDto = z.object({
  gameValue: z.number(),
  numberValue: z.number(),
  pointValue: z.enum(CardPointValueEnum),
  suit: z.enum(CardSuitEnum),
  id: z.number(),
});

export type DeckSingleCardDtoType = z.infer<typeof deckSingleCardDto>;
