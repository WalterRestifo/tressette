import { CardPointValueEnum, CardSuitEnum, PlayerEnum } from '../enums';

export let mockData = {
  gameValue: 1,
  numberValue: 1,
  pointValue: CardPointValueEnum.None,
  suit: CardSuitEnum.Clubs,
  id: 1,
};

export let mockPlayer = {
  hand: [mockData],
  name: PlayerEnum.Player1,
  isOwnTurn: true,
  points: 0,
};
