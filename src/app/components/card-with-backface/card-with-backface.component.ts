import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  Signal,
  ViewChild,
} from '@angular/core';
import { DeckSingleCardComponent } from '../deck-single-card/deck-single-card.component';
import { DeckSingleCardDtoType } from '../../models/dtos/deckSingleCard.dto';
import { PlayerDtoType } from '../../models/dtos/player.dto';
import { CardSuitEnum, PlayerEnum } from '../../models/enums';

@Component({
  selector: 'card-with-backface',
  imports: [DeckSingleCardComponent],
  templateUrl: './card-with-backface.component.html',
  styleUrl: './card-with-backface.component.scss',
})
export class CardWithBackfaceComponent {
  card = input<DeckSingleCardDtoType>();
  player = input.required<Signal<PlayerDtoType>>();
  leadingSuit = input<CardSuitEnum>();
  currentPlayerName = input<PlayerEnum>();
  opponentCardId: Signal<number | undefined>;
  isOpponentLastDrawnCard = input<boolean>();

  @ViewChild('handCardImageRef', { static: true })
  handCardImageRef!: ElementRef<HTMLDivElement>;

  // Expose the native element because needed for animations in parent
  get element(): HTMLDivElement {
    return this.handCardImageRef.nativeElement;
  }

  constructor() {
    this.opponentCardId = computed(
      () => this.player()().fromOpponentPlayerLastDrawnCard?.id
    );

    effect(() => {
      if (this.isOpponentLastDrawnCard() && this.opponentCardId()) {
        this.handCardImageRef.nativeElement.animate(
          [
            { transform: 'rotateY(180deg)' }, // starting pose
            { transform: 'rotateY(360deg)' }, // back → front
            { transform: 'rotateY(540deg)' }, // full rotation, end at 360 + 180°
          ],
          {
            duration: 800,
            easing: 'cubic-bezier(0.065, 0.915, 0.810, 0.070)',
            fill: 'both',
          }
        );
      }
    });
  }
}
