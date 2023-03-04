// Imports

import './css/styles.css';
import './images/turing-logo.png'
import { getData, getSpecificCustomer } from './apiCalls'
import Hotel from './classes/Hotel';
import Customers from './classes/Customers';

// Global Variables

const loginPage = document.querySelector('.login');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginBtn = document.querySelector('.login-button');
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

loginBtn.addEventListener('click', function() {
  login();
})

// Functions

function login() {
  event.preventDefault()
  const username = usernameInput.value;
  const password = passwordInput.value;

  if(password === 'overlook2021') {
    const userID = Number(username.slice('8'))
    console.log(userID)
    getSpecificCustomer(userID)
    .then(user => hotel.customers.selectCurrentCustomer(user))
    .then(() => console.log(hotel.customers))
  }
};

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classlist.remove('hidden');
}