/*
 * pwix:date-input/src/client/components/DateInput/DateInput.js
 *
 * A component for date input and visual validation by the user:
 * - have an input field with a date picker
 * - have a validation text on the right, so that the user may visually check his date
 *
 * Parms:
 * - name: optional name
 * - id: an optional input identifier
 * - value: the intial date (if any)
 * - defaultValue: the default value when selecting a date, defaulting to date of day
 * - inputFormat: the desired input (strftime) format, defaulting to the configured one
 * - placeholder: the desired placeholder, defaulting to the configured one
 * - helpFormat: the desired help (strftime) format, defaulting to the configured one
 * - withHelp: whether we make use of help format, defaulting to the configured one
 *
 * Triggers a 'date-input-data' event with the date as a Date (or null if invalid).
 */

import { DateJs } from 'meteor/pwix:date';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';
import { UIU } from 'meteor/pwix:ui-utils';

import './DateInput.html';

Template.DateInput.onCreated( function(){
    const self = this;

    self.PCK = {
        id: 'id-' + Random.id(),
        name: Template.currentData().name || 'date-input',
        inputFormat: Template.currentData().inputFormat || DateInput.configure().inputFormat,
        helpFormat: Template.currentData().helpFormat || DateInput.configure().helpFormat,
        placeholder: Template.currentData().placeholder || DateInput.configure().placeholder,
        withHelp: Template.currentData().withHelp || DateInput.configure().withHelp,
        jqInput: null,
        domReady: new ReactiveVar( false ),
        valueSet: new ReactiveVar( false ),

        // update the help text and send the data event
        help(){
            if( self.view.isRendered ){
                const str = self.$( '.DateInput input' ).val();
                const d = DateJs.sanitize( str );
                const help = d ? DateJs.toString( d, { format: self.PCK.helpFormat }) : '&nbsp;';
                self.$( '.DateInput p.help' ).html( help );
                self.$( '.DateInput' ).trigger( 'date-input-data', { name: self.PCK.name, date: d });
            }
        }
    };

    // because a value of PCK hash cannot be computed based on another value of this same hash at initialization time
    self.PCK.jqInput = DateJs.strftime2jquery( self.PCK.inputFormat );
});

Template.DateInput.onRendered( function(){
    const self = this;

    // initialize the datepicker DOM element
    const selector = '.DateInput#'+self.PCK.id+' input';
    const defaultValue = Template.currentData().defaultValue || null;
    UIU.DOM.waitFor( selector )
        .then(( elt ) => {
            let parms = {
                dateFormat: self.PCK.jqInput,
                defaultDate: defaultValue,
                todayHighlight: true,
                onClose: function( strdate, dp ){
                    const parsed = $.datepicker.parseDate( self.PCK.jqInput, strdate );
                    //console.log( 'strdate', strdate, 'parsed', parsed );    // strdate is the entered date as a string in 'yyyy-mm-dd' format, parsed is a Date
                    //element.dispatchEvent( new Event( 'input', { bubbles: true, cancelable: true }));
                    self.$( selector ).trigger( 'input' );
                    // prevent the focus to go the header cross close button
                    //element.focus();
                    return false;
                }
            };
            self.$( selector ).datepicker( parms );
            self.PCK.domReady.set( true );
        });

    // setup the initial value
    self.autorun(() => {
        if( self.PCK.domReady.get() && !self.PCK.valueSet.get()){
            self.$( selector ).datepicker( 'setDate', Template.currentData().value );
            self.PCK.help();
            self.PCK.valueSet.set( true );
        }
    });

    // setup an optional identifier
    self.autorun(() => {
        const id = Template.currentData().id;
        if( self.PCK.domReady.get() && id ){
            self.$( selector ).prop( 'id', id );
        }
    });
});

Template.DateInput.helpers({
    // the classes of the input field
    dClass(){
        return this.withBootstrapClasses === true ? 'ui-wdate-coched' : 'ui-wdate';
    },

    // the placeholder
    dPlaceholder(){
        return Template.instance().PCK.placeholder;
    },

    // whether the caller wants a help text
    hasHelp(){
        return Template.instance().PCK.withHelp !== false;
    },

    // component random identifier
    id(){
        return Template.instance().PCK.id;
    },

    // parms for coreFieldCheckIndicator
    parmsCheckIndicator(){
        return {};
    }
});

Template.DateInput.events({
    // open the datepicker when clicking the icon
    'click .js-dp'( event, instance ){
        const $dp = instance.$( event.currentTarget ).closest( '.input-svg-at-end' ).find( 'input' );
        if( $dp.datepicker( 'widget' ).is( ':visible' )){
            $dp.datepicker( 'hide' );
        } else {
            $dp.datepicker( 'show' );
        }
        return false;
    },

    // update the help text depending of the input
    'input .js-date'( event, instance ){
        instance.PCK.help();
    }
});
