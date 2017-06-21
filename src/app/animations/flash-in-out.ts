import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const flashInOut = trigger('flashInOut', [
  transition('void => *', [
    animate(500, keyframes([
      style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
      style({ opacity: 1, transform: 'translateX(-25px)', offset: 0.3 }),
      style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
    ]))
  ]),
  transition('*=>void', [
    animate('0.5s ease', style({
      height: 0,
      opacity: 0
    }))
  ])
]);
