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
    console.log(new Date(this.bookings[1].date))
    this.bookings.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
  }

  generateRooms(data) {
    this.rooms = data.map(room => new Room (room));
  }

  findAvailable(date) {
    const availableBookings = this.bookings
    .filter(booking => booking.date === date);
    const bookedRoomNumbers = availableBookings.map(booking => booking.roomNumber)
    this.availableRooms = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number));
  }

  showBooked() {
    let bookedRooms;
    bookedRooms = this.bookings
      .filter(booking => booking.userID === this.customers.currentCustomer.id)

    this.bookedRooms = bookedRooms;
  }

  filterByType(type) {
    this.availableRooms = this.availableRooms.filter(room => room.type === type);
  }

  getTotal() {
    const roomNumbers = this.bookedRooms.map(room => room.roomNumber)
    const roomCosts = this.rooms.reduce((acc, curr) => {
      acc[curr.number] = curr.costPerNight
      return acc
    }, {})
    const totalCost = roomNumbers.reduce((acc, curr) => {
      acc += roomCosts[curr]
      return acc
    }, 0)
    return totalCost
  }
}

export default Hotel