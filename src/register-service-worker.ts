import type { RegisterServiceWorker } from './types';

export async function registerServiceWorker({
  register,
  pathToServiceWorker = '/service-worker.js',
}: RegisterServiceWorker) {
  if ('serviceWorker' in navigator && register) {
    const { Workbox } = await import('workbox-window');
    const wb = new Workbox(pathToServiceWorker);

    wb.addEventListener('installed', () => {
      if (navigator.serviceWorker.controller) {
        // New Content Available event
        const event = new Event('swNewContentAvailable');
        window.dispatchEvent(event);
      } else {
        // Content Cached event
        const event = new Event('swContentCached');
        window.dispatchEvent(event);
      }
    });

    wb.register();
  }
}

declare global {
  interface WindowEventMap {
    swNewContentAvailable: CustomEvent,
    swContentCached: CustomEvent,
  }
}
