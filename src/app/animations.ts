import {trigger, transition, animate, style, group} from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  transition(':leave', [
    group([
      animate('0.3s ease', style({
        transform: 'translateX(50px)',
        width: 10
      })),
      animate('0.3s 0.2s ease', style({
        opacity: 0
      }))
    ])
  ])
]);
