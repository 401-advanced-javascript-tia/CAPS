'use strict';

const vendor = require('../lib/vendor.js');
const emitter = require('../lib/events.js');

jest.useFakeTimers();

it('should receive delivery politely', () => {
  console.log = jest.fn();
  emitter.emit('delivered', { orderID : '1234' });
  expect(console.log).toHaveBeenCalledWith('Delivered. Thank you.');
});

it.skip('should emit order', () => {

  const callback = jest.fn();

  emitter.on('pickup', callback);

  expect(callback).not.toBeCalled();

  vendor.start();

  jest.runOnlyPendingTimers();

  expect(callback).toBeCalledWith(expect.objectContaining({store:'DeliveryOfTheDay'}));

  expect(callback).toHaveBeenCalledTimes(1);

});