'use strict';
// MAIN HUB APPLICATION

const emitter = require('./events.js');

// manages the state of every package
// logs every event (pickup, intransit, delivered) to the console with a timestamp and event payload like EVENT {}



emitter.on('pickup', payload => eventLogHandler('pickup', payload));
emitter.on('in-transit', payload => eventLogHandler('in-transit', payload));
emitter.on('delivered', payload => eventLogHandler('delivered', payload));



function eventLogHandler(event, payload) {
  
  let time = new Date().getDate();
  
  const eventObj = {event, time, payload};
  
  console.log('EVENT', eventObj);
  
}



// emitter.prependListener
// emitter.on('pickup', pickupEventLog);
// emitter.on('in-transit', intransitEventLog);
// emitter.on('delivered', deliveredEventLog);


// function pickupEventLog(payload) {
//   const eventObj = {
//     event: 'pickup',
//     time: new Date().getTime(),
//     payload: payload,
//   };
//   console.log(`EVENT: ${eventObj}`);
// }

// function intransitEventLog(payload) {
//   const eventObj = {
//     event: 'in-transit',
//     time: new Date().getTime(),
//     payload: payload,
//   };
//   console.log(`EVENT: ${eventObj}`);
// }

// function deliveredEventLog(payload) {
//   const eventObj = {
//     event: 'delivered',
//     time: new Date().getTime(),
//     payload: payload,
//   };
//   console.log(`EVENT: ${eventObj}`);
// }




