# @afspeirs/service-worker

[![NPM Version][npm-version-shield]][npm-url]
[![NPM Bundle Size][npm-bundle-size-shield]][npm-url]

> Integrate a service-worker easily into your website

## About The Project

I am always using the same code across all of my web apps to install a service worker.

So I thought why not make it an npm package

This projects contains the code I use within every project to initialise the service worker and dispatch custom events to signal when there is an update available and when the assets have been cached.

## Table of contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
  - [Create config file](#create-config-file)
  - [postbuild script](#postbuild-script)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [registerServiceWorker](#function-registerserviceworker)
- [Custom Events](#custom-events)
  - [sw:content-cached](#swcontent-cached)
  - [sw:new-content-available](#swnew-content-available)
- [Roadmap](#roadmap)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Because we use workbox-window in this package. `workbox-cli` has been set as a peer dependency (which means that it will be installed in your project for you). This means that you can use `workbox-cli` commands within your builds scripts.

### Create config file

Create a config file called `workbox.config.cjs` (The name doesn't really matter, you just need to enter the same filename in the [postbuild](#postbuild-script) step)

```javascript
module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{css,js,png,html,webmanifest}',
  ],
  swDest: 'dist/service-worker.js',
  skipWaiting: true,
  clientsClaim: true,
};
```

> For more information view the [documentation site for generateSW config options](https://developer.chrome.com/docs/workbox/modules/workbox-build#type-GenerateSWOptions)

### `postbuild` script

Update your package.json to have the following `postbuild` script so that the service-worker is generated:

```json
"scripts": {
  ...
  "postbuild": "workbox generateSW workbox.config.cjs"
  ...
}
```

> For more information view the [documentation site for generateSW](https://developer.chrome.com/docs/workbox/modules/workbox-cli#generatesw)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```bash
npm i -S @afspeirs/service-worker
```

## Usage

Once installed in your project you can include import/require the code.

For example in a JavaScript project (using [Vite](https://vitejs.dev/)):

```javascript
import { registerServiceWorker } from '@afspeirs/service-worker';

registerServiceWorker({
  register: import.meta.env.PROD,
});
```

## API

### Function: `registerServiceWorker`

Registers a service worker using the Workbox library and dispatches custom events based on the service worker's installation status.

| Parameter           | Type    | Default value          | Required | Description                                    |
| ------------------- | ------- | ---------------------- | -------- | ---------------------------------------------- |
| register            | boolean | N/A                    | Yes      | When to register the service worker            |
| pathToServiceWorker | string  | `'/service-worker.js'` | No       | The path to where the service worker is stored |

Usage Example:

```javascript
import { registerServiceWorker } from '@afspeirs/service-worker';

registerServiceWorker({
  register: true,
  // register: import.meta.env.PROD,
  // register: process.env.NODE_ENV === 'production',
  pathToServiceWorker: '/custom-service-worker.js',
});
```

## Custom Events

### `sw:content-cached`

This event is dispatched (on the `window`) when the service worker is installed for the first time and the content is cached.

Usage Example:

```javascript
window.addEventListener('sw:content-cached', () => {
  console.log('Content has been cached for offline use.');
});
```

### `sw:new-content-available`

This event is dispatched (on the `window`) when a new version of the service worker is installed and there is new content available.

Usage Example:

```javascript
window.addEventListener('sw:new-content-available', () => {
  console.log('New content is available. Please refresh the page.');
});
```

### Roadmap

- [ ] Simplify the prerequisite steps and make it so that it can be controlled by this package

## License

[ISC License](/LICENSE.txt) © Andrew Speirs

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[npm-url]: https://www.npmjs.com/package/@afspeirs/service-worker
[npm-version-shield]: https://img.shields.io/npm/v/%40afspeirs%2Fservice-worker?style=for-the-badge&color=%23123abc
[npm-bundle-size-shield]: https://img.shields.io/bundlephobia/min/%40afspeirs%2Fservice-worker?style=for-the-badge&color=%23123abc
