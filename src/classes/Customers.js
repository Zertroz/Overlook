class Customers {
  constructor(data) {
    this.allCustomers = data;
    this.currentCustomer;
  }

  selectCurrentCustomer(id) {
    this.currentCustomer = this.allCustomers[id - 1]
  }
}

export default Customers;