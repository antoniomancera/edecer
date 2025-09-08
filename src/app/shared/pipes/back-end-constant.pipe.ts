import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backEndConstant',
  standalone: true,
})
export class BackEndConstantPipe implements PipeTransform {
  transform(value: string): string {
    return 'global.backend-constant.' + value;
  }
}
