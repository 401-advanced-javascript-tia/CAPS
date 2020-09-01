'use strict';

const emitter = require('./events.js');

// Monitor the system for events, on the 'pickup' event:
// Wait 1 second, log “DRIVER: picked up [ORDER_ID]” to the console.
// Emit an ‘in-transit’ event with the payload you received
// Wait 3 seconds, log “delivered” to the console
// Emit a ‘delivered’ event with the same payload


emitter.on('pickup', onPickupHandler);
emitter.on('in-transit', deliveredHandler);

function onPickupHandler(order) {

  //set Timeout, console log driver picked up order id, emitter.emit intransit order

  setTimeout(() => {

    console.log(`DRIVER: picked up ${order.orderId}.`);

    emitter.emit('in-transit', order);

  }, 1000);

}

function deliveredHandler(order) {

  setTimeout(() => {

    console.log(`DRIVER: delivered order ${order.orderId}.`);

    emitter.emit('delivered', order);

  }, 3000);

}