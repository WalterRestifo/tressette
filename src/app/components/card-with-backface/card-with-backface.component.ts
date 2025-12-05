import { Component, ElementRef, input, ViewChild } from '@angular/core';
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
  player = input.required<PlayerDtoType>();
  leadingSuit = input<CardSuitEnum>();
  currentPlayerName = input.required<PlayerEnum>();

  @ViewChild('handCardImageRef', { static: true })
  handCardImageRef!: ElementRef<HTMLDivElement>;

  // Expose the native element because needed for animations in parent
  get element(): HTMLDivElement {
    return this.handCardImageRef.nativeElement;
  }
}
