import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const slideUp =
  trigger('slideUp', [
    transition(':enter', [
      animate('1s', keyframes([
        style({ marginTop: '280%', offset: 0.0 }),
        style({ marginTop: '190%', offset: 0.2 }),
        style({ marginTop: '70%', offset: 0.3 }),
        style({ marginTop: '35%', offset: 0.4 }),
        style({ marginTop: '18%', offset: 0.5 }),
        style({ marginTop: '9%', offset: 0.6 }),
        style({ marginTop: '2%', offset: 0.8 })
      ]))
    ])
  ]);

export const fallDown =
  trigger('fallDown', [
    state('down', style({
      marginTop: '45%'
    })),
    transition('up => down', [
      animate('0.5s', keyframes([
        style({ marginTop: '45%', offset: 0.3 }),
        style({ marginTop: '42%', offset: 0.5 }),
        style({ marginTop: '47%', offset: 0.7 }),
        style({ marginTop: '45%', offset: 1 })
      ]))
    ]),
  ]);

export const fadeButtons =
  trigger('fadeButtons', [
    state('hidden', style({
      opacity: 0,
      display: 'none'
    })),
    state('show', style({
      opacity: 1
    })),
    transition('hidden => show', [
      animate('1s 1s', keyframes([
        style({ display: 'flex', offset: 0.0 }),
        style({ opacity: 1, offset: 1 }),
      ]))
    ]),
    transition('show => hidden', [
      animate('1s')
    ]),
  ]);

export const showInput =
  trigger('showInput', [
    state('hidden', style({
      opacity: 0,
      display: 'none'
    })),
    transition('hidden => show', [
      animate('1s', keyframes([
        style({ display: 'flex', offset: 0.0 }),
        style({ opacity: 1, offset: 1 }),
      ]))
    ])
  ]);

export const fadeEgg =
  trigger('fadeEgg', [
    state('hidden', style({
      opacity: 0,
      display: 'none'
    })),
    state('show', style({
      opacity: 1
    })),
    transition('hidden => show', [
      animate('1s')
    ]),
    transition('show => hidden', [
      animate('1s', keyframes([
        style({ opacity: 0, offset: 0.9 }),
        style({ display: 'none', offset: 1 }),
      ]))
    ]),
  ]);

  export const slideUpLocations =
  trigger('slideUpLocations', [
    state('hidden', style({
      bottom: '-20%'
    })),
    state('show', style({
      bottom: '0'
    })),
    transition('hidden => show', [
      animate('1s', keyframes([
        style({ bottom: '-20%', offset: 0 }),
        style({ bottom: '0%', offset: 1 })
      ]))
    ]),
    transition('show => hidden', [
      animate('1s', keyframes([
        style({ bottom: '0%', offset: 0 }),
        style({ bottom: '-20%', offset: 1 })
      ]))
    ])
  ])

  export const slideDownNotification =
  trigger('slideDownNotification', [
    state('hidden', style({
      top: '-50%'
    })),
    state('show', style({
      top: '5px'
    })),
    transition('hidden => show', [
      animate('1s 2s', keyframes([
        style({ top: '-50%', offset: 0 }),
        style({ top: '5px', offset: 1 })
      ]))
    ]),
    transition('show => hidden', [
      animate('1s', keyframes([
        style({ top: '5px', offset: 0 }),
        style({ top: '-50%', offset: 1 })
      ]))
    ])
  ])
