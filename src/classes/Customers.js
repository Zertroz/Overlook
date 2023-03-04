class Customers {
  constructor(data) {
    this.allCustomers = data;
    this.currentCustomer;
  }

  selectCurrentCustomer(user) {
    this.currentCustomer = user
  }
}

export default Customers;