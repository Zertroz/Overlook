function getAllCustomers() {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
}

function getAllRooms() {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => response.json())
}

function getAllBookings() {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json())
}

function getSpecificCustomer(id) {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
}

function getData() {
  const allCustomers = getAllCustomers()
  const allRooms = getAllRooms()
  const allBookings = getAllBookings()
  return Promise.all([allCustomers, allRooms, allBookings])
}

export { getData, getSpecificCustomer }