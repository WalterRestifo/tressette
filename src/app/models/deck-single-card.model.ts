import { CardPointValueEnum, CardSuitEnum } from './enums';

type DeckSingleCardType = {
  gameValue: number;
  numberValue: number;
  pointValue: CardPointValueEnum;
  suit: CardSuitEnum;
};

export class DeckSingleCard {
  constructor(public data: DeckSingleCardType) {}
}
