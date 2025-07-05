import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { createApp, setContextApp, getContextApp } from 'pixi-svelte';
import { eventEmitter, type EmitterEvent } from './eventEmitter';

const { stateApp } = createApp({ assets: {} });

export const setContext = () => {
  setContextEventEmitter<EmitterEvent>({ eventEmitter });
  setContextApp({ stateApp });
};

export const getContext = () => ({
  ...getContextEventEmitter<EmitterEvent>(),
  ...getContextApp()
});
