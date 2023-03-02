import chai from 'chai';
const expect = chai.expect;

import bookingData from '../src/testData/bookingData';
import Booking from '../src/classes/Booking';

describe('Booking test', () =>  {
  let booking1;

  beforeEach(() => {
    booking1 = new Booking(bookingData[0]);
  });

  it('should be a function', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking1.id).to.equal(bookingData[0].id);
  })

  it('should have a user ID', () => {
    expect(booking1.userID).to.equal(bookingData[0].userID);
  })

  it('should have a date', () => {
    expect(booking1.date).to.equal(bookingData[0].date);
  })

  it('should have a roomNumber', () => {
    expect(booking1.roomNumber).to.equal(bookingData[0].roomNumber)
  })
})