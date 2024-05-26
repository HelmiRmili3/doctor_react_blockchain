class User {
  constructor(address, password) {
    this.address = address;
    this.password = password;
  }

  // Getter for address
  getAddress() {
    return this.address;
  }

  // Setter for address
  setAddress(newAddress) {
    this.address = newAddress;
  }

  // Getter for password
  getPassword() {
    return this.password;
  }

  // Setter for password
  setPassword(newPassword) {
    this.password = newPassword;
  }

  // Function to validate password
  validatePassword(inputPassword) {
    return this.password === inputPassword;
  }
}
