import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bold',
  standalone: true,
})
export class BoldPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): any {
    const htmlString = `<b>${value}</b>`;
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
