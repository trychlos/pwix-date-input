/*
 * pwix:date-input/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

if( false ){
    // whitelist packages which are included via a subfolder or badly recognized
}

checkNpmVersions({
    'jquery-ui': '^1.13.3',
    'lodash': '^4.17.0'
},
    'pwix:date-input'
);
