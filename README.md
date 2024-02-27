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
  - [registerServiceWorker](#registerserviceworker)
    - [register parameter](#register-parameter)
    - [pathToServiceWorker parameter](#pathtoserviceworker-parameter)
- [Roadmap](#roadmap)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Because we use workbox-window in this package. `workbox-cli` has been set as a peer dependency (which means that it will be installed in your project for you). This means that you can use `workbox-cli` commands within your builds scripts.

### Create config file

Create a config file called `workbox.config.cjs` (The name doesn't really matter, you just need to enter the same filename in the [postbuild](#postbuild-script) step)

```js
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

```js
import { registerServiceWorker } from '@afspeirs/service-worker';

registerServiceWorker({
  register: import.meta.env.PROD,
  pathToServiceWorker: '/service-worker.js',
});
```

## API

### registerServiceWorker

This is the only exported function from the package currently.

```ts
registerServiceWorker(register: boolean, pathToServiceWorker: string = '/service-worker.js')
```

Supported params for the `registerServiceWorker` function are listed below.

#### `register` parameter

| Type    | Default value | Required | Description                         |
| ------- | ------------- | -------- | ----------------------------------- |
| boolean | N/A           | Yes      | When to register the service worker |

If present, the request will be performed as soon as the component is mounted

Example:

```js
import { registerServiceWorker } from '@afspeirs/service-worker';

registerServiceWorker({
  register: import.meta.env.PROD,
  // register: process.env.NODE_ENV === 'production',
});
```

#### `pathToServiceWorker` parameter

| Type   | Default value          | Required | Description                                    |
| ------ | ---------------------- | -------- | ---------------------------------------------- |
| string | `'/service-worker.js'` | No       | The path to where the service worker is stored |

If present, the service worker at the path will be used

Example:

```js
import { registerServiceWorker } from '@afspeirs/service-worker';

registerServiceWorker({
  register: true,
  pathToServiceWorker: '/sw.js',
});
```

<!-- ## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Add your changes: `git add .`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :sunglasses: -->

### Roadmap

- [ ] Simplify the prerequisite steps and make it so that it can be controlled by this package

## License

[ISC License](/LICENSE.txt) © Andrew Speirs

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[npm-url]: https://www.npmjs.com/package/@afspeirs/service-worker
[npm-version-shield]: https://img.shields.io/npm/v/%40afspeirs%2Fservice-worker?style=for-the-badge&color=%23123abc
[npm-bundle-size-shield]: https://img.shields.io/bundlephobia/min/%40afspeirs%2Fservice-worker?style=for-the-badge&color=%23123abc
