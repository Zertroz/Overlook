import chai from 'chai';
const expect = chai.expect;

import customersData from '../src/testData/customersData';
import Customers from '../src/classes/Customers';

describe('Customer Tests', function() {
  let customers;

  beforeEach(() => {
    customers = new Customers(customersData);
  })

  it('should be a function', function() {
    expect(customers).to.be.an.instanceOf(Customers);
  });

  it('should store an array of customers', function() {
    expect(customers.allCustomers).to.equal(customersData);
  })

  it('should be able to set a current customer', function() {
    customers.selectCurrentCustomer(1);
    expect(customers.currentCustomer).to.equal(customersData[0]);
  })

  it('should be able to select and reassign a different customer', function() {
    customers.selectCurrentCustomer(1);
    expect(customers.currentCustomer).to.equal(customersData[0]);

    customers.selectCurrentCustomer(5);
    expect(customers.currentCustomer).to.equal(customersData[4]);
  })
})