// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
    address public deployer;

    struct MedicalRecord {
        uint256 id;
        string description;
    }

    struct Appointment {
        uint256 id;
        string date;
        string username;
        string medicalRecord;
        string description;
    }

    struct User {
        address userAddress;
        string name;
        string birthday;
        string illness;
        string image;  // New field for image URL
        Appointment[] appointments;
    }

    mapping(address => User) public users;
    mapping(address => uint256) public medicalRecordCount;
    mapping(address => uint256) public appointmentCount;
    address[] public userAddresses;

    // Events
    event UserAdded(address indexed userAddress, string name);
    event MedicalRecordAdded(
        address indexed userAddress,
        uint256 recordId,
        string description
    );
    event MedicalRecordUpdated(
        address indexed userAddress,
        uint256 recordId,
        string description
    );
    event MedicalRecordDeleted(address indexed userAddress, uint256 recordId);
    event AppointmentAdded(
        address indexed userAddress,
        uint256 appointmentId,
        string date,
        string username,
        string medicalRecord,
        string description
    );
    event AppointmentUpdated(
        address indexed userAddress,
        uint256 appointmentId,
        string date,
        string username,
        string medicalRecord,
        string description
    );
    event AppointmentDeleted(
        address indexed userAddress,
        uint256 appointmentId
    );
    event MedicalRecordAddedToAppointment(
        address indexed userAddress,
        uint256 appointmentId,
        uint256 recordId,
        string description
    );
    event DescriptionAddedToAppointment(
        address indexed userAddress,
        uint256 appointmentId,
        string description
    );
    event UserDeleted(address indexed userAddress); // Event for user deletion

    constructor() {
        deployer = msg.sender;
    }

    // Modifiers
    modifier userExists(address _userAddress) {
        require(
            users[_userAddress].userAddress != address(0),
            "User does not exist"
        );
        _;
    }

    modifier onlyDeployer() {
        require(
            msg.sender == deployer,
            "Only the deployer can call this function"
        );
        _;
    }

    // Function to add a new user
    function addUser(
        address _userAddress,
        string memory _name,
        string memory _birthday,
        string memory _illness,
        string memory _image  // New parameter for image
    ) public {
        require(
            users[_userAddress].userAddress == address(0),
            "User already exists"
        );

        User storage user = users[_userAddress];
        user.userAddress = _userAddress;
        user.name = _name;
        user.birthday = _birthday;
        user.illness = _illness;
        user.image = _image;  // Assign the image URL

        userAddresses.push(_userAddress);

        emit UserAdded(_userAddress, _name);
    }

    // Function to delete a user by address
    function deleteUser(address _userAddress) public onlyDeployer {
        require(
            users[_userAddress].userAddress != address(0),
            "User does not exist"
        );

        // Deleting user from storage
        delete users[_userAddress];
        // Removing user address from the userAddresses array
        for (uint256 i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == _userAddress) {
                userAddresses[i] = userAddresses[userAddresses.length - 1];
                userAddresses.pop();
                break;
            }
        }

        emit UserDeleted(_userAddress);
    }

    // Function to get a user's details
    function getUser(address _userAddress)
        public
        view
        userExists(_userAddress)
        returns (
            string memory,
            string memory,
            string memory,
            string memory, 
            Appointment[] memory
        )
    {
        User storage user = users[_userAddress];
        return (user.name, user.birthday, user.illness, user.image, user.appointments);
    }

    // Function to get all user addresses
    function getAllUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    // Function to add an appointment
    function addAppointment(
        address _userAddress,
        string memory _date,
        string memory _username
    ) public payable userExists(_userAddress) {
        require(msg.value == 0.1 ether, "You must send exactly 0.1 ETH");

        // Transfer 0.1 ETH to the contract deployer
        (bool sent, ) = deployer.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        User storage user = users[_userAddress];
        uint256 appointmentId = appointmentCount[_userAddress]++;
        user.appointments.push(
            Appointment(
                appointmentId,
                _date,
                _username,
                "",
                ""
            )
        );

        emit AppointmentAdded(
            _userAddress,
            appointmentId,
            _date,
            _username,
            "",
            ""
        );
    }

    // Function to update an appointment
    function updateAppointment(
        address _userAddress,
        uint256 _appointmentId,
        string memory _newDate,
        string memory _username,
        string memory _medicalRecord, 
        string memory _description
    ) public {
        User storage user = users[_userAddress];
        bool appointmentFound = false;

        for (uint256 i = 0; i < user.appointments.length; i++) {
            if (user.appointments[i].id == _appointmentId) {
                user.appointments[i].date = _newDate;
                user.appointments[i].username = _username;
                user.appointments[i].medicalRecord = _medicalRecord;
                user.appointments[i].description = _description;
                appointmentFound = true;
                break;
            }
        }

        require(appointmentFound, "Appointment not found");

        emit AppointmentUpdated(
            _userAddress,
            _appointmentId,
            _newDate,
            _username,
            _medicalRecord,
            _description

        );
    }

    // Function to get all appointments of a user
    function getUserAppointments(address _userAddress)
        public
        view
        userExists(_userAddress)
        returns (Appointment[] memory)
    {
        User storage user = users[_userAddress];
        return user.appointments;
    }

    // Function to get all appointments
    function getAllAppointments()
        public
        view
        returns (Appointment[] memory)
    {
        uint256 totalAppointmentsCount;
        for (uint256 i = 0; i < userAddresses.length; i++) {
            totalAppointmentsCount += users[userAddresses[i]]
                .appointments
                .length;
        }

        Appointment[] memory allAppointments = new Appointment[](
            totalAppointmentsCount
        );
        uint256 currentIndex;
        for (uint256 i = 0; i < userAddresses.length; i++) {
            User storage user = users[userAddresses[i]];
            for (uint256 j = 0; j < user.appointments.length; j++) {
                allAppointments[currentIndex] = user.appointments[j];
                currentIndex++;
            }
        }
        return allAppointments;
    }

    // Function to fetch all users
    function fetchAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }
        return allUsers;
    }
}
