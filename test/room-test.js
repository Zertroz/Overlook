import chai from 'chai';
const expect = chai.expect;

import roomData from '../src/testData/roomData';
import Room from '../src/classes/Room';

describe('Room tests', function() {
  let room1;
  let room2;
  let room3;

  beforeEach(() => {
    room1 = new Room (roomData[0]);
    room2 = new Room (roomData[1]);
    room3 = new Room (roomData[2]);
  });

  it('should be a function', () => {
    expect(room1).to.be.an.instanceOf(Room);
  });

  it('should have a number', () => {
    expect(room1.number).to.equal(1)
    expect(room2.number).to.equal(2)
    expect(room3.number).to.equal(3)
  })
})