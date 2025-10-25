import { DeckSingleCard } from '../models/deck-single-card.model';
import { CardSuitEnum } from '../models/enums';
import { Player } from '../models/player.model';

export const determineWinnerCard = (
  firstPlayedCard: DeckSingleCard,
  secondPlayedCard: DeckSingleCard,
  leadingSuit: CardSuitEnum
) => {
  if (secondPlayedCard.data.suit !== leadingSuit) {
    return firstPlayedCard;
  } else if (firstPlayedCard.data.gameValue > secondPlayedCard.data.gameValue) {
    return firstPlayedCard;
  } else return secondPlayedCard;
};

export const removeCardFromHand = (player: Player) => {
  const indexOfTheCard = player.hand.findIndex(
    (cardOfHand) => cardOfHand.data.id === player.inThisTrickPlayedCard!.data.id
  );
  player.hand.splice(indexOfTheCard, 1);
};
