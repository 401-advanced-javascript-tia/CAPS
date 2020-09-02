'use strict';

// this is the HUB SERVER

const net = require('net');

require('dotenv').config();

const port = process.env.PORT || 3001;

const server = net.createServer();

server.listen(port, () => console.log(`Server listening on ${port}`));

let socketPool = {};

server.on('connection', socket => {

  socket.id = `Socket-${Math.random()}`;

  socketPool[socket.id] = socket;

  // console.log('SOCKETPOOL:', socketPool);

  //we care about the DATA coming in on the socket

  socket.on('data', onMessageReceived);


  socket.on('close', () => deleteSocket(socket.id));

});




function onMessageReceived(buffer){

  // console.log('[buffer in ONMESSAGERECEIVED]', buffer);

  
  // let message = JSON.parse(buffer.toString().trim());
  let message = buffer.toString();

  // console.log('MESSAGE in dispatch event', message);


  logEvent(message);
  broadcast(message);

}



function logEvent(message) {

  // console.log('MESSAGE IN LOG-EVENT', message);

  const messageObj = JSON.parse(message);

  const event = messageObj.event;
  const time = new Date();
  const payload = messageObj.payload;

  const eventObj = {event, time, payload};
  
  console.log('EVENT', eventObj);

}


function broadcast(message) {
  
  //CONSOLE LOG MESSAGE. DO WE NEED TO STRINGIFY??
  // let payload = JSON.stringify(message);
  for (let key in socketPool) {
    const socket = socketPool[key];
    socket.write(message);
  }
}


function deleteSocket(id) {

  // remove it from an object

  // using delete keyword gets rid of both key and value (rather than setting something to null and just getting rid of one)
  delete socketPool[id];
}

module.exports = server;