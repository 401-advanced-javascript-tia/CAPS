'use strict';


// const inquirer = require('inquirer');
// const net = require('net');
// const client = new net.Socket();
// client.connect(port, host, () => {
//   console.log('Woo! Successfully connected to', host, ':', port);
// });
// client.on('data', handleDataFromServer);


const faker = require('faker');
require('dotenv').config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const STORE_NAME = process.env.STORE_NAME;




const ioClient = require('socket.io-client');

// const capsChannel = ioClient.connect('http://localhost:3000/caps');
const capsChannel = ioClient.connect(`http://${host}:${port}/caps`)

capsChannel.emit('join', `${STORE_NAME}`);


function start() {
  setInterval(() => {

    const fakeOrderId = faker.finance.bitcoinAddress();
    const fakeName = faker.name.findName();
    const fakeAddress = faker.address.streetAddress();

    let fakeOrder = {
      storeName: STORE_NAME,
      orderId: fakeOrderId,
      customerName: fakeName,
      address: fakeAddress,
    };

    capsChannel.emit('pickup', fakeOrder);
    
  }, 5000);

}

start();

capsChannel.on('delivered', (payload) => {

  console.log('PAYLOAD IN VENDOR.JS: ', payload)

  console.log(`Thank you for delivering ${payload.orderId}`);
})
















// function handleDataFromServer(data) {
//   // looking at data, parseing it, and then looking if the event was delivered. if so, log a thank you with order id

//   // console.log('DATA IN HANDLE-DATA-FROM-SERVER IN VENDOR.JS: ', data);

//   // console.log('DATA OBJ IN VENDOR.JS', JSON.parse(data));

//   let eventObj = JSON.parse(data);

//   let event = eventObj.event;

//   if(event === 'delivered'){
//     let id = eventObj.payload.orderId;
//     console.log(`Thank you for delivering ${id}`);
//   } else {
//     return;
//   }
// }

// Create a message object with the following keys:
// event - ‘pickup’
// payload - the order object you created in the above step
// Write that message (as a string) to the CAPS server


// function start() {
//   setInterval(() => {
    
//     // console.log(`New order every 5 secs: ${new Date().getDate()}`);
//     // emitter.emit('pickup', fakeOrder);

//     const fakeOrderId = faker.finance.bitcoinAddress();
//     const fakeName = faker.name.findName();
//     const fakeAddress = faker.address.streetAddress();

//     let fakeOrder = {
//       storeName: STORE_NAME,
//       orderId: fakeOrderId,
//       customerName: fakeName,
//       address: fakeAddress,
//     };

//     let event = JSON.stringify({event: 'pickup', payload: fakeOrder});

//     client.write(event);
    
//   }, 5000);

// }

// start();




// function sendMessage














// Every 5 seconds, simulate a new customer order
// Create a fake order, as an object:
// storeName, orderId, customerName, address
// Emit a ‘pickup’ event and attach the fake order as payload
// HINT: Have some fun by using the faker library to make up phony information

// function start() {
//   setInterval(() => {
    
//     console.log(`New order every 5 secs: ${new Date().getDate()}`);
    
//     emitter.emit('pickup', fakeOrder);
    
//   }, 5000);

// }

// start();


// emitter.on('delivered', logDelivered);

// function logDelivered() {
//   console.log('Delivered. Thank you.');
// }

// module.exports = start;


