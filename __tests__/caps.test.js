'use strict';

jest.useFakeTimers();
const emitter = require('../lib/events.js');
require('../lib/caps.js');

const delivery = {
  store: 'My Store',
  orderId: '1234',
  customer: 'YourNameHere',
  address: '123 Some Lane in Some Town',
};

it('should log a pickup', () => {

  console.log = jest.fn();

  emitter.emit('pickup', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event: 'pickup'}));
});

it('should log in-transit', () => {

  console.log = jest.fn();

  emitter.emit('in-transit', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event: 'in-transit'}));

});

it('should log delivered', () => {

  console.log = jest.fn();

  emitter.emit('delivered', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event: 'delivered'}));
});
