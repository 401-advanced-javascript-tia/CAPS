'use strict';

const net = require('net');
// net is built in to Node, its TCP library

const port = process.env.PORT || 3001;

const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`));

let socketPool = {};


// listenning for connection and we get payload on it, which is the socket
// 'connection' is NOT potato, it needs to be connection and data and error and end etc
server.on('connection', (socket) => {

  const id = `Socket-${Math.random()}`;

  socketPool[id] = socket;


  // need to launch another app and "connect" to get this to show up
  console.log('connection', socketPool);
});
