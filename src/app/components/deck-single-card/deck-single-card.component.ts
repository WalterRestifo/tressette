import { Component, input } from '@angular/core';
import { DeckSingleCardType } from '../../models/deck-single-card.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-deck-single-card',
  imports: [MatCardModule],
  templateUrl: './deck-single-card.component.html',
})
export class DeckSingleCardComponent {
  data = input.required<DeckSingleCardType>();

  get numberValue() {
    return this.data().numberValue;
  }

  get suit() {
    return this.data().suit;
  }
}
