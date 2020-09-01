'use strict';
// MAIN HUB APPLICATION

const emitter = require('../events.js');

// manages the state of every package
// logs every event (pickup, intransit, delivered) to the console with a timestamp and event payload like EVENT {}


emitter.prependListener('pickup', pickupEventLog);
emitter.prependListener('in-transit', intransitEventLog);
emitter.prependListener('delivered', deliveredEventLog);

function pickupEventLog(payload) {

  const eventObj = {
    event: 'pickup',
    time: new Date().getTime(),
    payload: payload,
  };

  console.log(`EVENT: ${eventObj}`);
}

function intransitEventLog(payload) {

  const eventObj = {
    event: 'in-transit',
    time: new Date().getTime(),
    payload: payload,
  };

  console.log(`EVENT: ${eventObj}`);
}

function deliveredEventLog(payload) {

  const eventObj = {
    event: 'delivered',
    time: new Date().getTime(),
    payload: payload,
  };

  console.log(`EVENT: ${eventObj}`);
}



