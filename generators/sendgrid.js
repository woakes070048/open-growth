// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Libs
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var config = require('./config')
var pubnub = require('pubnub')
var bodyParser = require('body-parser')

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// SendGrid
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (app) {
    // Tell express to use the body-parser middleware
    app.use(bodyParser.json());

    app.post( '/sendgrid', function( request, response ) {
        var message = {
            "signal" : "sendgrid",
            "body"   : request.body
        };

        var pn = new pubnub({
              "publishKey"   : process.env.TESTPUBKEY
            , "subscribeKey" : process.env.TESTSUBKEY
        });
        
        pn.publish({
              "channel" : "sg_analytics"
            , "message" : message
        });

        //tell sendgrid 200 ok.
        response.sendStatus(200);
    });
};