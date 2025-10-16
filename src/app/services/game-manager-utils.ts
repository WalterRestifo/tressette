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
  console.log('id of the played card: ', player.inThisTrickPlayedCard?.data.id);
  const indexOfTheCard = player.hand.findIndex(
    (cardOfHand) => cardOfHand.data.id === player.inThisTrickPlayedCard!.data.id
  );
  console.log('index of the played card: ', indexOfTheCard);
  player.hand.splice(indexOfTheCard, 1);
};
