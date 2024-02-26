export type RegisterServiceWorker = {
  /**
   * The path to where the service worker is stored
   * @default '/service-worker.js'
   */
  pathToServiceWorker?: string,
  /**
   * When to register the service worker
   */
  register: boolean,
};
