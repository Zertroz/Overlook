import Customers from "./Customers";
import Booking from "./Booking";
import Room from "./Room";

class Hotel {
  constructor(customers) {
    this.customers = new Customers(customers)
    this.bookings;
    this.rooms;
    this.availableRooms;
    this.bookedRooms;
  }

  generateBookings(data) {
    this.bookings = data.map(booking => new Booking (booking));
  }

  generateRooms(data) {
    this.rooms = data.map(room => new Room (room));
  }

  showAvailable(date) {
    const availableBookings = this.bookings
    .filter(booking => booking.userID !== this.customers.currentCustomer.id)
    .filter(booking => booking.date === date);
    
    const bookedRoomNumbers = availableBookings.map(booking => booking.roomNumber)
    this.availableRooms = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number));
  }

  showBooked(date) {
    let bookedRooms
    if (date) {
      bookedRooms = this.bookings
      .filter(booking => booking.userID === this.customers.currentCustomer.id)
      .filter(booking => booking.date === date)
    } else {
      bookedRooms = this.bookings
      .filter(booking => booking.userID === this.customers.currentCustomer.id)
    }
    
    const bookedRoomNumbers = bookedRooms.map(booking => booking.roomNumber)
    this.bookedRooms = this.rooms.filter(room => bookedRoomNumbers.includes(room.number));
  }

}

export default Hotel