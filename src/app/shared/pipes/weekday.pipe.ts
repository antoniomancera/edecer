import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday',
})
export class WeekdayPipe implements PipeTransform {
  transform(day: number): string {
    const weekdays = [
      'global.week-days.monday',
      'global.week-days.tuesday',
      'global.week-days.wednesday',
      'global.week-days.thursday',
      'global.week-days.friday',
      'global.week-days.saturday',
      'global.week-days.sunday',
    ];

    return weekdays[day] || '';
  }
}
