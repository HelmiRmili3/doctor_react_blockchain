 // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract Storage {
//     address public deployer;

//     struct MedicalRecord {
//         uint256 id;
//         string description;
//     }

//     struct Appointment {
//         uint256 id;
//         string date;
//         string username;
//     }

//     struct User {
//         address userAddress;
//         string name;
//         string birthday;
//         string illness;
//         string[] descriptions;
//         MedicalRecord[] medicalRecords;
//         Appointment[] appointments;
//     }

//     mapping(address => User) public users;
//     mapping(address => uint256) public medicalRecordCount;
//     mapping(address => uint256) public appointmentCount;
//     address[] public userAddresses;

//     // Events
//     event UserAdded(address indexed userAddress, string name);
//     event MedicalRecordAdded(
//         address indexed userAddress,
//         uint256 recordId,
//         string description
//     );
//     event MedicalRecordUpdated(
//         address indexed userAddress,
//         uint256 recordId,
//         string description
//     );
//     event MedicalRecordDeleted(address indexed userAddress, uint256 recordId);
//     event AppointmentAdded(
//         address indexed userAddress,
//         uint256 appointmentId,
//         string date,
//         string username
//     );
//     event AppointmentUpdated(
//         address indexed userAddress,
//         uint256 appointmentId,
//         string date,
//         string username
//     );
//     event AppointmentDeleted(
//         address indexed userAddress,
//         uint256 appointmentId
//     );

//     constructor() {
//         deployer = msg.sender;
//     }

//     // Modifiers
//     modifier userExists(address _userAddress) {
//         require(
//             users[_userAddress].userAddress != address(0),
//             "User does not exist"
//         );
//         _;
//     }

//     modifier onlyDeployer() {
//         require(
//             msg.sender == deployer,
//             "Only the deployer can call this function"
//         );
//         _;
//     }

//     // Function to add a new user
//     function addUser(
//         address _userAddress,
//         string memory _name,
//         string memory _birthday,
//         string memory _illness,
//         string[] memory _descriptions
//     ) public {
//         require(
//             users[_userAddress].userAddress == address(0),
//             "User already exists"
//         );

//         User storage user = users[_userAddress];
//         user.userAddress = _userAddress;
//         user.name = _name;
//         user.birthday = _birthday;
//         user.illness = _illness;
//         user.descriptions = _descriptions;

//         userAddresses.push(_userAddress);

//         emit UserAdded(_userAddress, _name);
//     }

//     // Function to get a user's details
//     function getUser(
//         address _userAddress
//     )
//         public
//         view
//         userExists(_userAddress)
//         returns (
//             string memory,
//             string memory,
//             string memory,
//             string[] memory,
//             MedicalRecord[] memory,
//             Appointment[] memory
//         )
//     {
//         User storage user = users[_userAddress];
//         return (
//             user.name,
//             user.birthday,
//             user.illness,
//             user.descriptions,
//             user.medicalRecords,
//             user.appointments
//         );
//     }

//     // Function to get all user addresses
//     function getAllUserAddresses() public view returns (address[] memory) {
//         return userAddresses;
//     }

//     // Function to update a user's descriptions
//     function updateUserDescription(
//         address _userAddress,
//         string memory _newDescription
//     ) public {
//         User storage user = users[_userAddress];
//         user.descriptions.push(_newDescription);
//     }

//     // Function to add a medical record
//     function addMedicalRecord(
//         address _userAddress,
//         string memory _description
//     ) public  {
//         User storage user = users[_userAddress];
//         uint256 recordId = medicalRecordCount[_userAddress]++;
//         user.medicalRecords.push(MedicalRecord(recordId, _description));

//         emit MedicalRecordAdded(_userAddress, recordId, _description);
//     }

//     // Function to update a medical record
//     function updateMedicalRecord(
//         address _userAddress,
//         uint256 _recordId,
//         string memory _newDescription
//     ) public{
//         User storage user = users[_userAddress];
//         bool recordFound = false;

//         for (uint256 i = 0; i < user.medicalRecords.length; i++) {
//             if (user.medicalRecords[i].id == _recordId) {
//                 user.medicalRecords[i].description = _newDescription;
//                 recordFound = true;
//                 break;
//             }
//         }

//         require(recordFound, "Medical record not found");

//         emit MedicalRecordUpdated(_userAddress, _recordId, _newDescription);
//     }

//     // Function to delete a medical record
//     function deleteMedicalRecord(
//         address _userAddress,
//         uint256 _recordId
//     ) public userExists(_userAddress) {
//         User storage user = users[_userAddress];
//         bool recordFound = false;

//         for (uint256 i = 0; i < user.medicalRecords.length; i++) {
//             if (user.medicalRecords[i].id == _recordId) {
//                 user.medicalRecords[i] = user.medicalRecords[
//                     user.medicalRecords.length - 1
//                 ];
//                 user.medicalRecords.pop();
//                 recordFound = true;
//                 break;
//             }
//         }

//         require(recordFound, "Medical record not found");

//         emit MedicalRecordDeleted(_userAddress, _recordId);
//     }

//     // Function to add an appointment
//     function addAppointment(
//         address _userAddress,
//         string memory _date,
//         string memory _username
//     ) public payable userExists(_userAddress) {
//         require(msg.value == 0.1 ether, "You must send exactly 0.1 ETH");

//         // Transfer 0.1 ETH to the contract deployer
//         (bool sent, ) = deployer.call{value: msg.value}("");
//         require(sent, "Failed to send Ether");

//         User storage user = users[_userAddress];
//         uint256 appointmentId = appointmentCount[_userAddress]++;
//         user.appointments.push(Appointment(appointmentId, _date, _username));

//         emit AppointmentAdded(_userAddress, appointmentId, _date, _username);
//     }

//     // Function to update an appointment
//     function updateAppointment(
//         address _userAddress,
//         uint256 _appointmentId,
//         string memory _newDate,
//         string memory _username
//     ) public  {
//         User storage user = users[_userAddress];
//         bool appointmentFound = false;

//         for (uint256 i = 0; i < user.appointments.length; i++) {
//             if (user.appointments[i].id == _appointmentId) {
//                 user.appointments[i].date = _newDate;
//                 user.appointments[i].username = _username;
//                 appointmentFound = true;
//                 break;
//             }
//         }

//         require(appointmentFound, "Appointment not found");

//         emit AppointmentUpdated(
//             _userAddress,
//             _appointmentId,
//             _newDate,
//             _username
//         );
//     }

//     // Function to delete an appointment
//     function deleteAppointment(
//         address _userAddress,
//         uint256 _appointmentId
//     ) public  {
//         User storage user = users[_userAddress];
//         bool appointmentFound = false;

//         for (uint256 i = 0; i < user.appointments.length; i++) {
//             if (user.appointments[i].id == _appointmentId) {
//                 user.appointments[i] = user.appointments[
//                     user.appointments.length - 1
//                 ];
//                 user.appointments.pop();
//                 appointmentFound = true;
//                 break;
//             }
//         }

//         require(appointmentFound, "Appointment not found");

//         emit AppointmentDeleted(_userAddress, _appointmentId);
//     }

//     // Function for a user to get all their appointments
//     function getUserAppointments(
//         address _userAddress
//     ) public view  returns (Appointment[] memory) {
//         User storage user = users[_userAddress];
//         return user.appointments;
//     }

//     // Function for the deployer to get all appointments
//     function getAllAppointments()
//         public
//         view
//         onlyDeployer
//         returns (Appointment[] memory)
//     {
//         uint256 totalAppointmentsCount;
//         for (uint256 i = 0; i < userAddresses.length; i++) {
//             totalAppointmentsCount += users[userAddresses[i]]
//                 .appointments
//                 .length;
//         }

//         Appointment[] memory allAppointments = new Appointment[](
//             totalAppointmentsCount
//         );
//         uint256 currentIndex;
//         for (uint256 i = 0; i < userAddresses.length; i++) {
//             User storage user = users[userAddresses[i]];
//             for (uint256 j = 0; j < user.appointments.length; j++) {
//                 allAppointments[currentIndex] = user.appointments[j];
//                 currentIndex++;
//             }
//         }
//         return allAppointments;
//     }
// }