Package.describe({
    name: 'pwix:date-input',
    version: '1.2.1',
    summary: 'A Meteor package to manage validities',
    git: 'https://github.com/trychlos/pwix-date-input.git',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'DateInput'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:date-input' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    const _use = function(){
        api.use( ...arguments );
        api.imply( ...arguments );
    };
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    _use( 'blaze-html-templates@2.0.0 || 3.0.0-alpha300.0', 'client' );
    _use( 'check' );
    _use( 'ecmascript' );
    _use( 'less@4.0.0', 'client' );
    _use( 'pwix:date@1.0.0-rc' );
    _use( 'pwix:ui-bootstrap5@2.0.0' );
    _use( 'pwix:ui-fontawesome6@1.0.0' );
    _use( 'pwix:ui-utils@1.4.0' );
    _use( 'random' );
    _use( 'reactive-var' );
    _use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    api.addFiles( 'src/client/components/DateInput/DateInput.js', 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
