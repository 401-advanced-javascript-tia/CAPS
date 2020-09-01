'use strict';

const emitter = require('../events');

// Monitor the system for events, on the 'pickup' event:
// Wait 1 second, log “DRIVER: picked up [ORDER_ID]” to the console.
// Emit an ‘in-transit’ event with the payload you received
// Wait 3 seconds, log “delivered” to the console
// Emit a ‘delivered’ event with the same payload

emitter.on('pickup', onPickup);

function onPickup(order) {

  console.log('ORDER IN DRIVER.JS: ', order);

  setTimeout(() => {

    console.log(`DRIVER: picked up ${order.orderId}.`);

    emitter.emit('in-transit', order);

  }, 1000);

  setTimeout(() => {

    console.log(`DRIVER: delivered order ${order.orderId}.`);

    emitter.emit('delivered', order);

  }, 3000);

}

module.exports = onPickup;