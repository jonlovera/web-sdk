import { createEventEmitter } from 'utils-event-emitter';

export type EmitterEvent =
  | { type: 'score'; score: number }
  | { type: 'gameOver'; total: number };

export const { eventEmitter } = createEventEmitter<EmitterEvent>();
