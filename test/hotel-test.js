import chai from 'chai';
const expect = chai.expect;

import bookingData from '../src/testData/bookingData';
import Booking from '../src/classes/Booking';
import roomData from '../src/testData/roomData';
import Room from '../src/classes/Room';
import customersData from '../src/testData/customersData';
import Customers from '../src/classes/Customers';
import Hotel from '../src/classes/Hotel';

describe('Hotel test', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel (customersData);
  })

  it('should be a function', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  })

  it('should use a method to create an array of bookings', () => {
    expect(hotel.bookings).to.be.undefined;

    hotel.generateBookings(bookingData);

    expect(hotel.bookings).to.be.lengthOf(bookingData.length);
  })

  it('should use a method to get all rooms', () => {
    expect(hotel.rooms).to.be.undefined;

    hotel.generateRooms(roomData);

    expect(hotel.rooms).to.be.lengthOf(roomData.length);
  })

  it('should list the available rooms', () => {
    hotel.customers.selectCurrentCustomer(1);
    hotel.generateBookings(bookingData);
    hotel.generateRooms(roomData);
    hotel.findAvailable('2022/02/16');
    expect(hotel.availableRooms).to.be.lengthOf(9);
  })

  it('should list rooms the user has booked', () => {
    hotel.customers.selectCurrentCustomer({
      "id": 1,
      "name": "Leatha Ullrich"
    });
    hotel.generateBookings(bookingData);
    hotel.generateRooms(roomData);

    hotel.showBooked();

    expect(hotel.bookedRooms).to.be.lengthOf(2);
  })

  it('should be able to filter available rooms by type', () => {
    hotel.customers.selectCurrentCustomer({
      "id": 1,
      "name": "Leatha Ullrich"
    });
    hotel.generateBookings(bookingData);
    hotel.generateRooms(roomData);

    hotel.findAvailable('2022/04/22');

    hotel.filterByType('single room');

    expect(hotel.availableRooms).to.be.lengthOf(5);
  })

  it('should calculate the total cost spent on rooms', () => {
    hotel.customers.selectCurrentCustomer({
      "id": 1,
      "name": "Leatha Ullrich"
    });
    hotel.generateBookings(bookingData);
    hotel.generateRooms(roomData);

    hotel.showBooked()

    expect(hotel.getTotal()).to.equal(835.78)
  })
})