'use strict';

// this is the HUB SERVER

require('dotenv').config();

const port = process.env.PORT || 3001;
const STORE_NAME = process.env.STORE_NAME;

const messageQueue = {
  //waiting for messages to queue

  // pickup: {

  //segment by driver as well

  // driver: {
  // driver relate messages here by some unique id
  // }

  // }
};

const io = require('socket.io')(port);

const caps = io.of('/caps');

caps.on('connection', (socket) => {

  console.log('CAPS CHANNEL SOCKET:', socket.id);

  socket.on('join', room => {
    console.log('joined room:', room);
    socket.join(room);
  });


  socket.on('received', orderId => {
    console.log('MESSAGE QUEUE BEFORE:', messageQueue);

    // the payload coming in here would be the orderId from 'received' in driver
    delete messageQueue.orderId;

    console.log('MESSAGE QUEUE AFTER:', messageQueue);
  });

  socket.on('pickup', (payload) => {

    // we need to queue up pickup messages
    messageQueue[payload.orderId] = payload;

    caps.emit('pickup', payload);

    const event = 'pickup';
    const time = new Date();
    const eventObj = {event, time, payload};
    console.log('EVENT', eventObj);

    console.log('MESSAGES IN PICKUP IN SERVER-------', messageQueue);

  });


  socket.on('in-transit', (payload) => {

    caps.to(`${STORE_NAME}`).emit('in-transit', payload);

    const event = 'in-transit';
    const time = new Date();
    const eventObj = {event, time, payload};
    console.log('EVENT', eventObj);

  });


  socket.on('delivered', (payload) => {

    caps.to(`${STORE_NAME}`).emit('delivered', payload);

    const event = 'delivered';
    const time = new Date();
    const eventObj = {event, time, payload};
    console.log('EVENT', eventObj);

  });


  socket.on('getall', () => {

    for(let id in messageQueue) {

      const payload = messageQueue;

      caps.emit('pickup', payload);

    }
  });

  
});

