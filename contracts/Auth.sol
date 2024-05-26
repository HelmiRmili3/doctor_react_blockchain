// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
    struct UserData {
        address userAddress;
        string username;
        string password;
        uint256 createdAt;
        int role;
        string image;  // New field for image URL
    }

    mapping(address => UserData) private users;

    constructor() {
        // Add initial admin user
        address adminAddress = msg.sender;
        users[adminAddress] = UserData({
            userAddress: adminAddress,
            username: "Admin",
            password: "0xf23ec0bb4210edd5cba85afd05127efcd2fc6a781bfed49188da1081670b22d8",
            createdAt: block.timestamp,
            role: 0,
            image: "https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-doctor-icon-circle-png-image_2055257.jpg"  // Default empty image for admin
        });
    }

    function addUser(
        address _address,
        string memory _username,
        string memory _password,
        string memory _image  // New parameter for image
    ) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_password).length > 0, "Password cannot be empty");
        require(users[_address].createdAt == 0, "User already exists");

        UserData memory newUser = UserData({
            userAddress: _address,
            username: _username,
            password: _password,
            createdAt: block.timestamp,
            role: 1,
            image: _image 
        });

        users[_address] = newUser;
    }

    function getUserData(address _userAddress)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            uint256,
            int,
            string memory  // Return image URL
        )
    {
        UserData memory userData = users[_userAddress];
        require(userData.createdAt > 0, "User does not exist");

        return (
            userData.userAddress,
            userData.username,
            userData.password,
            userData.createdAt,
            userData.role,
            userData.image  // Return the image URL
        );
    }

    function deleteUser(address _userAddress) public {
        UserData memory userData = users[_userAddress];
        require(userData.createdAt > 0, "User does not exist");

        delete users[_userAddress];
    }
}
