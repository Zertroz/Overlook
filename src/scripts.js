// Imports

import './css/styles.css';
import './images/turing-logo.png'
import { getData, getSpecificCustomer, postBooking } from './apiCalls'
import Hotel from './classes/Hotel';
import MicroModal from "micromodal";

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
const errorMsg = document.querySelector('.error-msg');
const modalTitle = document.querySelector('.modal-title');
const modalCont = document.querySelector('.modal-content');

let hotel;

// Event Listeners

window.addEventListener('load', () => {
  resolveData();
})

loginBtn.addEventListener('click', () => {
  login();
})

bookingSectionBtn.addEventListener('click', () => {
  renderBookings();
  show(bookingsPage);
  hide(availablePage);
  hide(filterForm);
})

availableBtn.addEventListener('click', () => {
  showAvailable();
  hide(bookingsPage);
  show(availablePage);
  show(filterForm);
})

submitBtn.addEventListener('click', () => {
  event.preventDefault();
  showAvailable();
})

availablePage.addEventListener('click', () => {
  createNewBooking();
})

bookingsSection.addEventListener('click', () => {
  if(event.target.className === 'booking-card' || event.target.parentElement.className === 'booking-card') {
    openRoomInfo();
  }
})

// Functions

function resolveData() {
  getData()
    .then((data) => {
      hotel = new Hotel (data[0].customers);
      hotel.generateRooms(data[1].rooms);
      hotel.generateBookings(data[2].bookings);
      renderTypes();
    });
}

function resolvePost() {
  getData()
    .then((data) => {
      hotel.generateRooms(data[1].rooms);
      hotel.generateBookings(data[2].bookings);
      renderTypes();
      hotel.showBooked()
      showAvailable();
    });
}

function login() {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const userID = parseInt(username.split('customer')[1])
  if(password === 'overlook2021' && username.includes('customer') && userID >= 1 && userID <= 50) {
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
  } else if (!password || !username) {
    errorMsg.innerText = 'Please enter a valid username and password.';
  } else if (password !== 'overlook2021' || !username.includes('customer') || userID < 1 || userID > 50) {
    errorMsg.innerText = 'Username or password is incorrect.';
  };
};

function renderBookings() {
  hotel.showBooked();
  bookingsSection.innerHTML = '';
  hotel.bookedRooms.forEach(room => {
    bookingsSection.innerHTML += `
    <button class="booking-card" id="${room.id}" tabindex="0">
      <p>Room ${room.roomNumber}</p>
      <p>${room.date}</p>
    </button>
    `;
  });
  const totalCostSection = document.querySelector('.total-cost')
  totalCostSection.innerHTML = `<p>Total Spent: $${hotel.getTotal().toFixed(2)}` 
}

function showAvailable() {
  const date = dateInput.value.split('-').join('/');
  const type = typeSelect.value;
  hotel.findAvailable(date);
  filterAvailable(type);
  if(date && hotel.availableRooms.length !== 0) {
    availableSection.innerHTML = ''
    hotel.availableRooms.forEach(room => {
      if(room.bidet) {
        availableSection.innerHTML += `
        <div class="available-card" id="${room.number}">
          <p>Room #${room.number}</p>
          <p>This is a ${room.type} with ${room.numBeds} ${room.bedSize} bed(s). Bidet Included!</p>
          <p>Cost per night: $${room.costPerNight}</p>
          <button class="book-button">Book this room</button>
        </div>
        `
      } else {
        availableSection.innerHTML += `
        <div class="available-card" id="${room.number}">
          <p>Room #${room.number}</p>
          <p>This is a ${room.type} with ${room.numBeds} ${room.bedSize} bed(s).</p>
          <p>Cost per night: $${room.costPerNight}</p>
          <button class="book-button">Book this room</button>
        </div>
        `
      }
    })
  } else if (date && hotel.availableRooms.length === 0) {
    availableSection.innerHTML = `<p>We deeply apologize, but there are no room available for this date.`
  } else {
    availableSection.innerHTML = `<p>Please select a date.</p>`
  }
}

function filterAvailable(type) {
  if(type !== 'none') {
    hotel.filterByType(type);
  }
}

function renderTypes() {
  typeSelect.innerHTML = '<option value="none">None</option>'
  const roomList = hotel.rooms.map(room => room.type)
  const roomTypes = [... new Set(roomList)]
  roomTypes.forEach(room => {
    typeSelect.innerHTML += `<option value="${room}">${room.toUpperCase()}</option>`
  })
}

function createNewBooking() {
  if(event.target.className === 'book-button') {
    const newBooking = {
      userID: hotel.customers.currentCustomer.id,
      date: dateInput.value.split('-').join('/'),
      roomNumber: Number(event.target.parentElement.id)
    }
    postBooking(newBooking)
  }
}

function openRoomInfo() {
  let target
  if (event.target.className === 'booking-card')  {
    target = event.target.id
  } else {
    target = event.target.parentElement.id
  }
  const targetBooking = hotel.bookings.find(booking => booking.id === target)
  const targetRoom = hotel.rooms.find(room => room.number === targetBooking.roomNumber)
  MicroModal.show('modal-1');
  modalTitle.innerText = `${targetRoom.type.toUpperCase()}`
  if (targetRoom.bidet) {
    modalCont.innerHTML = `<p>Room #${targetRoom.number}</p>
    <p>This is a ${targetRoom.type} with ${targetRoom.numBeds} ${targetRoom.bedSize} bed(s). Bidet Included!</p>
    <p>Cost per night: $${targetRoom.costPerNight}</p>`
  } else {
    modalCont.innerHTML = `<p>Room #${targetRoom.number}</p>
    <p>This is a ${targetRoom.type} with ${targetRoom.numBeds} ${targetRoom.bedSize} bed(s).</p>
    <p>Cost per night: $${targetRoom.costPerNight}</p>`
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

export default resolvePost