/*
 * pwix:date-input/src/common/js/trace.js
 */

_verbose = function( level ){
    if( DateInput.configure().verbosity & level ){
        let args = [ ...arguments ];
        args.shift();
        console.debug( ...args );
    }
};

_trace = function( functionName ){
    _verbose( DateInput.C.Verbose.FUNCTIONS, ...arguments );
};
