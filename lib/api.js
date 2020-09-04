'use strict';
// accept post requests on /pickup route

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3001;
const STORE_NAME = process.env.STORE_NAME;

const faker = require('faker');

const fakeOrderId = faker.finance.bitcoinAddress();
const fakeName = faker.name.findName();
const fakeAddress = faker.address.streetAddress();


app.post('/pickup', (req, res) => {


  let delivery = (Object.keys(req.body).length && req.body) || {
    storeName: STORE_NAME,
    orderId: fakeOrderId,
    customerName: fakeName,
    address: fakeAddress,
  };

  // const hasBody = !!Object.keys(req.body).length;

  // const delivery = hasBody ? req.body : defaultDelivery;

  socket.emit('pickup', delivery);

  res.status(200).send('scheduled');

})


app.listen(PORT, () => {

});