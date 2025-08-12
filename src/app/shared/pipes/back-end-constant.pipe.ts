import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backEndConstant',
  standalone: true,
})
export class BackEndConstantPipe implements PipeTransform {
  transform(value: string): unknown {
    return 'global.backend-constant.' + value;
  }
}
