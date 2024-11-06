import { DailyStats } from './daily-stats.interface';
import { Goal } from './goal.interface';
import { UserInfo } from './user-info.interface';

export interface Home {
  weekStats: DailyStats[];
  goal: Goal;
  userInfo: UserInfo;
}
