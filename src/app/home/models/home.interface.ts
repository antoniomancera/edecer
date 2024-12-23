import { Deck } from 'src/app/shared/models/deck.interface';
import { DailyStats } from '../../stats/models/daily-stats.interface';
import { Goal } from './goal.interface';
import { UserInfo } from './user-info.interface';

export interface Home {
  weekStats: DailyStats[];
  goal: Goal;
  userInfo: UserInfo;
  decks: Deck[];
  lastDeckId: number;
}
