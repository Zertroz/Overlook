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

let hotel;

// Event Listeners

window.addEventListener('load', () => {
  getData()
    .then((data) => {
      hotel = new Hotel (data[0].customers);
      hotel.generateRooms(data[1].rooms);
      hotel.generateBookings(data[2].bookings);
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
  showAvailable('2022/04/22');
  hide(bookingsPage);
  show(availablePage);
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
      hide(loginPage);
      show(dashboard);
      show(bookingSectionBtn);
      show(availableBtn);
    });
  };
};

function renderBookings() {
  hotel.showBooked();
  bookingsSection.innerHTML = ''
  hotel.bookedRooms.forEach(room => {
    bookingsSection.innerHTML += `
    <div class="booking-card" id="${room.id}">
      <p>Room ${room.roomNumber}</p>
      <p>${room.date}</p>
    </div>
    `;
  });
}

function showAvailable(date) {
  hotel.showAvailable(date);
  availableSection.innerHTML = ''
  console.log(hotel.availableRooms)
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
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}