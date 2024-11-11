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

### Blaze components

#### `DateInput`

A Blaze component which let you enter a date, or pick a date from the integrated jQuery calendar, and see the date in another format to be sure to not mix month and days.

Accepted data context is:

- `name`: an optional name, just to improve debug messages

- `id`: the input identifier to be set, defaulting to none

- `value`: an optional initial Date (if any)

- `defaultValue`: the default value when selecting a date, defaulting to date of day

- `inputFormat`: the desired input (strftime) format, defaulting to the configured one

- `placeholder`: the desired placeholder, defaulting to the configured one

- `helpFormat`: the desired help (strftime) format, defaulting to the configured one

- `withHelp`: whether we make use of help format, defaulting to the configured one

## Configuration

The package's behavior can be configured through a call to the `DateInput.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `inputFormat`

    The `strftime` input format, defaulting to `%Y-%m-%d` which is a ISO date as in '2024-07-13'.

- `placeholder`

    A string to be used as placeholder, should be consistent with the configured input format.

- `withHelp`

    Whether an help string should be displayed when entering a date, defaulting to `false`.

- `helpFormat`

    The `strftime` help format, defaulting to `%e %b %Y` which is a rather-well readable date as in '13 Jul. 2024'.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `DateInput.C.Verbose.NONE`

        Do not display any trace log to the console

    - `DateInput.C.Verbose.CONFIGURE`

        Trace `DateInput.configure()` calls and their result
    
    Defaults to `DateInput.C.Verbose.CONFIGURE`.

Please note that `DateInput.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `DateInput.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

`DateInput.configure()` is a reactive data source.

## NPM peer dependencies

Starting with v 1.0.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.1.0:

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
- Last updated on 2024, Oct. 4th
