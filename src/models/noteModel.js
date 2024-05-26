class Note {
    constructor(address, description) {
      this.address = address;
      this.description = description;
    }
  
    // Getter for address
    getAddress() {
      return this.address;
    }
  
    // Setter for address
    setAddress(newAddress) {
      this.address = newAddress;
    }
  
    // Getter for description
    getDescription() {
      return this.description;
    }
  
    // Setter for description
    setDescription(newDescription) {
      this.description = newDescription;
    }
  
    // Function to update both address and description
    updateDetails(newAddress, newDescription) {
      this.address = newAddress;
      this.description = newDescription;
    }
  }
  