class Appointment {
    constructor(address, time, subject) {
      this.address = address;
      this.time = time;
      this.subject = subject;
    }
  
    // Getter for address
    getAddress() {
      return this.address;
    }
  
    // Setter for address
    setAddress(newAddress) {
      this.address = newAddress;
    }
  
    // Getter for time
    getTime() {
      return this.time;
    }
  
    // Setter for time
    setTime(newTime) {
      this.time = newTime;
    }
  
    // Getter for subject
    getSubject() {
      return this.subject;
    }
  
    // Setter for subject
    setSubject(newSubject) {
      this.subject = newSubject;
    }
  
    // Function to reschedule appointment
    reschedule(newTime) {
      this.time = newTime;
    }
  }