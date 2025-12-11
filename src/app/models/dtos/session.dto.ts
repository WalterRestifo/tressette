import { SessionTypeEnum } from '../enums';
import { PlayerNameDtoType } from './playerName.dto';

export type SessionDto = {
  sessionId: string;
  sessionType: SessionTypeEnum;
  player: PlayerNameDtoType;
};
