'use strict';

// const emitter = require('../events.js');

// const inquirer = require('inquirer');
const net = require('net');
require('dotenv').config();

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;


client.connect(port, host, () => {
  console.log('Woo! Successfully connected to', host, ':', port);
});


client.on('data', handleDriverDataFromServer);



function handleDriverDataFromServer(data) {
  // looking at data, parseing it, and then looking if the event was delivered. if so, log a thank you with order id

  // console.log('DATA IN HANDLE-DATA-FROM-SERVER IN DRIVER.JS: ', data);

  let eventObj = JSON.parse(data);

  let event = eventObj.event;

  if(event === 'pickup'){

    setTimeout(() => {

      // console.log('EVENTOBJ IN DRIVER.JS:', eventObj);

      let id = eventObj.payload.orderId;
      let payload = eventObj.payload;

      console.log(`Picking up order ${id}`);

      let message = JSON.stringify({event: 'in-transit', payload});

      client.write(message);


    }, 1000);

    setTimeout(() => {
  
      let id = eventObj.payload.orderId;
      let payload = eventObj.payload;
  
      console.log(`Delivering order ${id}`);
  
      let message = JSON.stringify({event: 'delivered', payload});
  
      client.write(message);
  
    }, 3000);

    
  } 

}






// emitter.on('pickup', onPickupHandler);
// emitter.on('in-transit', deliveredHandler);
// function onPickupHandler(order) {
//   //set Timeout, console log driver picked up order id, emitter.emit intransit order
//   setTimeout(() => {
//     console.log(`DRIVER: picked up ${order.orderId}.`);
//     emitter.emit('in-transit', order);
//   }, 1000);
// }
// function deliveredHandler(order) {
//   setTimeout(() => {
//     console.log(`DRIVER: delivered order ${order.orderId}.`);
//     emitter.emit('delivered', order);
//   }, 3000);
// }