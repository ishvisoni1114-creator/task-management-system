import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityIcon'
})
export class PriorityIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
