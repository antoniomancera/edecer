import { DailyStats } from './daily-stats.interface';
import { Goal } from './goal.interface';

export interface Home {
  weekStats: DailyStats[];
  goal: Goal;
}
