
const Alexa = require('alexa-sdk');
var request = require('request');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const PISERVER = "<update with base URL>";

const handlers = {
    'LaunchRequest': function () {
        this.emit('CheckTemperature');
    },
    'CheckTemperatureIntent': function () {
        this.emit('CheckTemperature');
    },
    'CheckTemperature': function () {
        console.log("Serving CheckTemperature request");
        var thisHandler = this;
        request(PISERVER + '/temperature', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("Emitting response");
            thisHandler.emit(':tell', "The temperature is " + body + " degrees.");
          }
        });                
    },
    'HighTemperature': function () {
        console.log("Serving HighTemperature request");
        var thisHandler = this;
        request(PISERVER + '/high-temperature', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("Emitting response");
            thisHandler.emit(':tell', "The high temperature from the last 24 hours was " + body + " degrees.");
          }
        });
    },
    'LowTemperature': function () {
        console.log("Serving LowTemperature request");
        var thisHandler = this;
        request(PISERVER + '/low-temperature', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("Emitting response");
            thisHandler.emit(':tell', "The low temperature from the last 24 hours was " + body + " degrees.");
          }
        });
    },
    'AMAZON.HelpIntent': function () {
	     var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "What's the temperature? ";
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Cancelled");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Stopped");
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', "Goodbye");
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

