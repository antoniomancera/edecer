import { Component, Input } from '@angular/core';

import { MotPalabra } from '../../models/MotPalabra.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() motPalabra: MotPalabra;
}
