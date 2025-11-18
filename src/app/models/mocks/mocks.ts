import { DeckSingleCardDtoType } from '../dtos/deckSingleCard.dto';
import { GameDataDto } from '../dtos/gameData.dto';
import { PlayerDtoType } from '../dtos/player.dto';
import { SessionDto } from '../dtos/session.dto';
import { SessionIdentityDtoType } from '../dtos/sessionIdentity.dto';
import {
  CardPointValueEnum,
  CardSuitEnum,
  PlayerEnum,
  SessionTypeEnum,
} from '../enums';

export let mockCard: DeckSingleCardDtoType = {
  gameValue: 1,
  numberValue: 1,
  pointValue: CardPointValueEnum.None,
  suit: CardSuitEnum.Clubs,
  id: 1,
};

export let mockPlayer: PlayerDtoType = {
  hand: [mockCard],
  name: PlayerEnum.Player1,
  isOwnTurn: true,
  points: 0,
};

export const mockSessionId = 'mockSessionId';

export const mockSessionIdentity: SessionIdentityDtoType = {
  sessionId: mockSessionId,
  player: PlayerEnum.Player1,
};

export const mockGameData: GameDataDto = {
  player: mockPlayer,
  gameEnded: false,
  inThisTrickPlayedCards: {
    player1: mockCard,
    player2: undefined,
  },
  currentPlayerName: PlayerEnum.Player1,
  sessionIdentity: mockSessionIdentity,
  winner: undefined,
};

export const mockSessionData: SessionDto = {
  sessionId: mockSessionId,
  sessionType: SessionTypeEnum.New,
  player: PlayerEnum.Player1,
};
