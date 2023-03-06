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

  findAvailable(date) {
    console.log(this.customers.currentCustomer.id)
    const availableBookings = this.bookings
    .filter(booking => booking.date === date);
    console.log(availableBookings)
    const bookedRoomNumbers = availableBookings.map(booking => booking.roomNumber)
    console.log(bookedRoomNumbers)
    this.availableRooms = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number));
    console.log(this.availableRooms)
  }

  showBooked() {
    let bookedRooms;
    console.log(this.customers.currentCustomer)
    bookedRooms = this.bookings
      .filter(booking => booking.userID === this.customers.currentCustomer.id)

    this.bookedRooms = bookedRooms;
  }

  filterByType(type) {
    this.availableRooms = this.availableRooms.filter(room => room.type === type);
  }

  getTotal() {
    const roomNumbers = this.bookedRooms.map(room => room.roomNumber)
    const totalSpent = this.rooms.filter(room => roomNumbers.includes(room.number))
      .reduce((acc, curr) => {
        acc += curr.costPerNight
        return acc
      }, 0)
    return totalSpent
  }
}

export default Hotel