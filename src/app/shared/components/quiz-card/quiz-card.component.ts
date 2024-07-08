import { Component, Input } from '@angular/core';

import { WordTranslation } from '../../models/WordTranslation.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() wordTranslation: WordTranslation;
}
