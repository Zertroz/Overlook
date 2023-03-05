// Imports

import './css/styles.css';
import './images/turing-logo.png'
import { getData, getSpecificCustomer } from './apiCalls'
import Hotel from './classes/Hotel';

// Global Variables

const loginPage = document.querySelector('.login');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginBtn = document.querySelector('.login-button');
const dashboard = document.querySelector('.dashboard');
const bookingsPage = document.querySelector('.bookings-page');
const bookingsSection = document.querySelector('.bookings-section');
const availablePage = document.querySelector('.available-page');
const availableSection = document.querySelector('.available-section');
const availableBtn = document.querySelector('.available-button');
const bookingSectionBtn = document.querySelector('.bookings-section-button');
const filterForm = document.querySelector('.filter-form');
const dateInput = document.querySelector('.date-input');
const typeSelect = document.querySelector('.type-select');
const submitBtn = document.querySelector('.submit-button');

let hotel;

// Event Listeners

window.addEventListener('load', () => {
  getData()
    .then((data) => {
      hotel = new Hotel (data[0].customers);
      hotel.generateRooms(data[1].rooms);
      hotel.generateBookings(data[2].bookings);
      renderTypes()
    });
})

loginBtn.addEventListener('click', () => {
  login();
})

bookingSectionBtn.addEventListener('click', () => {
  renderBookings();
  show(bookingsPage);
  hide(availablePage);
})

availableBtn.addEventListener('click', () => {
  showAvailable();
  hide(bookingsPage);
  show(availablePage);
})

submitBtn.addEventListener('click', () => {
  filterAvailable();
})
// Functions

function login() {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  if(password === 'overlook2021') {
    const userID = Number(username.slice('8'))
    getSpecificCustomer(userID)
    .then(user => hotel.customers.selectCurrentCustomer(user))
    .then(() => {
      renderBookings();
      showAvailable();
      hide(loginPage);
      show(dashboard);
      show(bookingSectionBtn);
      show(availableBtn);
    });
  };
};

function renderBookings() {
  hotel.showBooked();
  bookingsSection.innerHTML = '';
  hotel.bookedRooms.forEach(room => {
    bookingsSection.innerHTML += `
    <div class="booking-card" id="${room.id}">
      <p>Room ${room.roomNumber}</p>
      <p>${room.date}</p>
    </div>
    `;
  });
  bookingsSection.innerHTML += `<p>Total Spent: $${hotel.getTotal().toFixed(2)}` 
}

function showAvailable(date) {
  if(date) {
    hotel.showAvailable(date);
    availableSection.innerHTML = ''
    hotel.availableRooms.forEach(room => {
      if(room.bidet) {
        availableSection.innerHTML += `
        <div class="available-card">
          <p>Room #${room.number}</p>
          <p>This is a ${room.type} with ${room.numBeds} ${room.bedSize} bed(s). Bidet Included!</p>
          <p>Cost per night: $${room.costPerNight}
        </div>
        `
      } else {
        availableSection.innerHTML += `
        <div class="available-card">
          <p>Room #${room.number}</p>
          <p>This is a ${room.type} with ${room.numBeds} ${room.bedSize} bed(s).</p>
          <p>Cost per night: $${room.costPerNight}
        </div>
        `
      }
    })
  } else {
    availableSection.innerHTML = `<p>Please insert a date</p>`
  }
}

function filterAvailable() {
  event.preventDefault();
  const date = dateInput.value.split('-').join('/');
  const type = typeSelect.value;

  hotel.showAvailable(date);
  hotel.filterByType(type);
  showAvailable(date);
}

function renderTypes() {
  typeSelect.innerHTML = '<option value="none">None</option>'
  const roomList = hotel.rooms.map(room => room.type)
  const roomTypes = [... new Set(roomList)]
  console.log(roomTypes)
  roomTypes.forEach(room => {
    typeSelect.innerHTML += `<option value="${room}">${room.toUpperCase()}</option>`
  })
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}