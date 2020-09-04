'use strict';

require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;


const ioClient = require('socket.io-client');

// const capsChannel = ioClient.connect('http://localhost:3000/caps');
const capsChannel = ioClient.connect(`http://${host}:${port}/caps`);


capsChannel.emit('getall');

capsChannel.on('pickup', (payload) => {

  capsChannel.emit('received', payload.orderId);
  
  setTimeout(() => {
    
    let id = payload.orderId;
    
    console.log(`Picking up order ${id}`);

    capsChannel.emit('in-transit', payload);

    simulateDelivery(payload);

  }, 1500);



});


function simulateDelivery(payload) {

  setTimeout(() => {
  
    let id = payload.orderId;

    console.log(`Delivering order ${id}`);

    capsChannel.emit('delivered', payload);

  }, 3000);

}



