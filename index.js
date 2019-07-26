const axios = require( 'axios' );
const fs = require( 'fs' );
const inputFilePath = process.argv[2];
var settings = {
    cashIn: {},
    cashOut: {
        natural: {},
        juridical: {}
    }
};
var loaded = 0;
const loadTotal = 4;
var accounts = [];
var uniqueAccounts = {};

console.log( inputFilePath );

axios.get( 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in' ).then( ( res ) => {
    settings.cashIn = res.data;
} ).catch( ( err ) => {
    settings.cashIn = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
} ).finally( () => loaded++ );

axios.get( 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural' ).then( ( res ) => {
    settings.cashOut.natural = res.data;
} ).catch( ( err ) => {
    settings.cashOut.natural = { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } };
} ).finally( () => loaded++ );

axios.get( 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical' ).then( ( res ) => {
    settings.cashOut.juridical = res.data;
} ).catch( ( err ) => {
    settings.cashOut.juridical = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
} ).finally( () => loaded++ );

fs.readFile( inputFilePath, 'utf8', ( err, res ) => {
    loaded++;
    accounts = JSON.parse( res );
    console.log( res );
} )

wait();

function wait() {

    if ( loaded >= loadTotal )
        calculation();
    else 
        setTimeout( () => wait(), 1000 );
}

function calculation() {
    for ( let i = 0; i < accounts.length; i++ ) {
        let account = accounts[ i ];
        let uAccount = uniqueAccounts[ account.user_id ];
        let result = 0;

        if ( !uAccount ) {
            uAccount = uniqueAccounts[ account.user_id ] = {
                user_type: account.user_type,
                cashIn: { amount: 0 },
                cashOut: { amount: 0 },
                currentWeeekMondayDate: new Date ( new Date( account.date ).getTime() - (new Date( account.date ).getDay()-1 )*1000*60*60*24 )
            }
        } else {
            let timeElapsed = Math.floor( ( new Date( account.date ).getTime() - uAccount.currentWeeekMondayDate.getTime() ) / ( 1000*60*60*24 ) );
            
            if ( timeElapsed >= 7 ) {
                currentWeeekMondayDate = new Date ( new Date( account.date ).getTime() - (new Date( account.date ).getDay()-1 )*1000*60*60*24 );
                uAccount.cashOut.amount = 0;
            }
        }

        if ( account.type == 'cash_out') {
            uAccount.cashOut.amount += account.operation.amount;

            if ( account.user_type == 'natural' ) {
                if ( uAccount.cashOut.amount > settings.cashOut.natural.week_limit.amount ) {
                    if ( uAccount.cashOut.amount - account.operation.amount - settings.cashOut.natural.week_limit.amount < 0 )
                        result = uAccount.cashOut.amount - account.operation.amount - settings.cashOut.natural.week_limit.amount;

                    result = ( result + account.operation.amount ) / 100 * settings.cashOut.natural.percents;
                }
            } else if ( account.user_type == 'juridical' ) {
                result = account.operation.amount / 100 * settings.cashOut.juridical.percents;
                result = result > settings.cashOut.juridical.min.amount ? result : settings.cashOut.juridical.min.amount;
            }
        } else if ( account.type == 'cash_in' ) {
            result = account.operation.amount * settings.cashIn.percents / 100 ;
            result = result < settings.cashIn.max.amount ? result : settings.cashIn.max.amount;
        }
        
        console.log ( Math.ceil10( result, -2 ).toFixed( 2 ) );
    };
}

function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }