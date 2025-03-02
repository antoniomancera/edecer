import {
  animation,
  animate,
  keyframes,
  style,
  AnimationReferenceMetadata,
} from '@angular/animations';

export const TADA = animation(
  animate(
    '{{ duration }}',
    keyframes([
      style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
      style({
        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
        offset: 0.1,
      }),
      style({
        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
        offset: 0.2,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.3,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        offset: 0.4,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.5,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        offset: 0.6,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.7,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        offset: 0.8,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.9,
      }),
      style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
    ])
  ),
  {
    params: {
      duration: '1s',
    },
  }
);

export const HINGE = animation(
  animate(
    '{{ duration }}',
    keyframes([
      style({
        transformOrigin: 'top left',
        animationTimingFunction: 'ease-in-out',
        offset: 0,
      }),
      style({
        transformOrigin: 'top left',
        animationTimingFunction: 'ease-in-out',
        transform: 'rotate3d(0, 0, 1, 80deg)',
        offset: 0.2,
      }),
      style({
        opacity: 1,
        transformOrigin: 'top left',
        animationTimingFunction: 'ease-in-out',
        transform: 'rotate3d(0, 0, 1, 60deg)',
        offset: 0.4,
      }),
      style({
        transformOrigin: 'top left',
        animationTimingFunction: 'ease-in-out',
        transform: 'rotate3d(0, 0, 1, 80deg)',
        offset: 0.6,
      }),
      style({
        opacity: 1,
        transformOrigin: 'top left',
        animationTimingFunction: 'ease-in-out',
        transform: 'rotate3d(0, 0, 1, 60deg)',
        offset: 0.8,
      }),
      style({ opacity: 0, transform: 'translate3d(0, 700px, 0)', offset: 1 }),
    ])
  ),
  {
    params: {
      duration: '1s',
    },
  }
);

export const ZOOM_IN = animation(
  animate(
    '{{ duration }}',
    keyframes([
      style({ opacity: 0, transform: 'scale3d(.3, .3, .3)', offset: 0 }),
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 0.5 }),
    ])
  ),
  {
    params: {
      duration: '1s',
    },
  }
);
