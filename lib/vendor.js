'use strict';

const emitter = require('./events.js');
const faker = require('faker');
require('dotenv').config();

const STORE_NAME = process.env.STORE_NAME;
const fakeOrderId = faker.finance.bitcoinAddress();
// bitcoin address looks like an order id, but can also use random.alphaNumeric
const fakeName = faker.name.findName();
const fakeAddress = faker.address.streetAddress();

let fakeOrder = {
  storeName: STORE_NAME,
  orderId: fakeOrderId,
  customerName: fakeName,
  address: fakeAddress,
};

// Every 5 seconds, simulate a new customer order
// Create a fake order, as an object:
// storeName, orderId, customerName, address
// Emit a ‘pickup’ event and attach the fake order as payload
// HINT: Have some fun by using the faker library to make up phony information

function start() {
  setInterval(() => {
    
    console.log(`New order every 5 secs: ${new Date().getDate()}`);
    
    emitter.emit('pickup', fakeOrder);
    
  }, 5000);

}

start();



// Monitor the system for events …
// Whenever the ‘delivered’ event occurs
// Log “thank you” to the console

emitter.on('delivered', logDelivered);

function logDelivered() {
  console.log('Delivered. Thank you.');
}

module.exports = start;


