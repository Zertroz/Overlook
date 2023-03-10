import resolvePost from "./scripts"

function getAllCustomers() {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .catch(error => {
    console.log(error)
    alert('Our server is currently down. Please try again soon.')
  })
}

function getAllRooms() {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => response.json())
  .catch(error => {
    console.log(error)
    alert('Our server is currently down. Please try again soon.')
  })
}

function getAllBookings() {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json())
  .catch(error => {
    console.log(error)
    alert('Our server is currently down. Please try again soon.')
  })
}

function getSpecificCustomer(id) {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  .catch(error => {
    console.log(error)
    alert('Our server is currently down. Please try again soon.')
  })
}

function postBooking(booking) {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.status);
    } else {
      resolvePost();
    }
  })
  .catch(error => console.log(error));
}

function getData() {
  const allCustomers = getAllCustomers();
  const allRooms = getAllRooms();
  const allBookings = getAllBookings();
  return Promise.all([allCustomers, allRooms, allBookings]);
}

export { getData, getSpecificCustomer, postBooking }