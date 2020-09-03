'use strict';

// this is the HUB SERVER

require('dotenv').config();

const port = process.env.PORT || 3001;
const STORE_NAME = process.env.STORE_NAME;

const io = require('socket.io')(port);

const caps = io.of('/caps');

caps.on('connection', (socket) => {

  console.log('CAPS CHANNEL SOCKET:', socket.id);

  socket.on('join', room => {
    console.log('joined room:', room);
    socket.join(room);
  });


  socket.on('pickup', (payload) => {
    // goes to all sockets

    caps.emit('pickup', payload);

    const event = 'pickup';
    const time = new Date();
    const eventObj = {event, time, payload};
    console.log('EVENT', eventObj);

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

  
});

