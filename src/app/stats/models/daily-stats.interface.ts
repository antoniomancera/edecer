export interface DailyStats {
  date: Date;
  totalAttempts: number;
  totalSuccesses: number;
  monthDay?: number;
  weekDay?: number;
  isAttemptsGoalSuccess?: boolean;
  isSuccessesAccuracyGoalSuccess?: boolean;
}
