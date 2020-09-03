'use strict';

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

  console.log(`Thank you for delivering ${payload.orderId}`);
})

