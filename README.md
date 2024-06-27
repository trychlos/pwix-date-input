# pwix:date-input

## What is it ?

A small package which provides an advanced component to enter a valid date:
- have an input field, with a standard (jQueryUI) date picker
- have a visual check with a real-time label on the side.

## Installation

This Meteor package is installable with the usual command:

```sh
    meteor add pwix:date-input
```

## Usage

```html
    {{> DateInput (parmsDate) }}
```

```js
    import { DateInput } from 'meteor/pwix:date-input';
```

## Provides

### `DateInput`

The exported `DateInput` global object provides following items:

#### Functions

##### `DateInput.configure()`

    See [below](#configuration).

## NPM peer dependencies

Starting with v 1.0.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.0.0:

```js
    'jquery-ui': '^1.13.3',
    'lodash': '^4.17.0'
```

Each of these dependencies should be installed at application level:

```sh
    meteor npm install <package> --save
```

## Translations

None at the moment.

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-date-input/issues).

---
P. Wieser
- Last updated on 2024, Jun. 27th
