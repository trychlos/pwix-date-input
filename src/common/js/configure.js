/*
 * pwix:date-input/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};

DateInput._conf = new ReactiveVar( _conf );

DateInput._defaults = {
    helpFormat: '%e %b %Y',
    inputFormat: '%Y-%m-%d',
    placeholder: 'yyyy-mm-dd',
    verbosity: DateInput.C.Verbose.CONFIGURE,
    withHelp: false
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server.
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
DateInput.configure = function( o ){
    if( o && _.isObject( o )){
        _.merge( _conf, DateInput._defaults, o );
        DateInput._conf.set( _conf );
        // be verbose if asked for
        if( _conf.verbosity & DateInput.C.Verbose.CONFIGURE ){
            console.log( 'pwix:date-input configure() with', o );
        }
    }
    // also acts as a getter
    return DateInput._conf.get();
}

_.merge( _conf, DateInput._defaults );
DateInput._conf.set( _conf );
