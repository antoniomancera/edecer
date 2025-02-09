import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstChartUpper',
})
export class FirstChartUpperPipe implements PipeTransform {
  transform(word: string): string {
    if (word && word.trim().length > 0) {
      return word[0].toUpperCase() + word.substring(1);
    }
    return '';
  }
}
