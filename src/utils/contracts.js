import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");

// Auth smart contrat
export const Auth = require("./Auth.json");
export const AuthAddress = "0x558D06AB890a847531964e6a42CD3c440388e11F";
export const AuthContract = new web3.eth.Contract(Auth.abi, AuthAddress);

// Storage Smart contract
export const Storage = require("./Storage.json");
export const StorageAddress = "0x5E1c7d6E3fBc47419E1C6972B0eDac01476A41Bf";
export const StorageContract = new web3.eth.Contract(
  Storage.abi,
  StorageAddress
);

export const signUp = (useraddress, username, password) => {
  try {
    AuthContract.methods
      .addUser(useraddress, username, password)
      .send({ from: useraddress, gas: 600000 })
      .then((response) => {
        console.log("Response (addUser) : ", response);
      });
  } catch (error) {
    console.log(error);
  }
};
// export const signOut = () => {
//   return false;
// };
// export const getUserData = (userAddress) => {
//   if (userAddress) {
//     let user = {};
//     StorageContract.methods
//       .getUser(userAddress)
//       .call()
//       .then((response) => {
//         user = userDataToJson(response);
//         console.log("Response (getUserData) : ", response);
//       });
//     return user;
//   } else {
//     console.log(" User address is empty");
//     return {};
//   }
// };
// export const getAllUsers = (useraddress) => {
//   let users = [];
//   StorageContract.methods
//     .getAllUserAddresses(useraddress)
//     .call()
//     .then((response) => {
//       users = response;
//       console.log("Response (getAllUsers) : ", response);
//     });
//   return users;
// };

// export const updateUserDescriptions = (address, userAddress, descriptions) => {
//   try {
//     StorageContract.methods
//       .updateUserDescriptions(userAddress, descriptions)
//       .send({ from: address, gas: 600000 })
//       .then((response) => {
//         console.log("Response (updateUserDescriptions) : ", response);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const addMedicalRecord = (address, userAddress, description) => {
//   try {
//     StorageContract.methods
//       .addMedicalRecord(userAddress, description)
//       .send({ from: address, gas: 600000 })
//       .then((response) => {
//         console.log("Response (addMedicalRecord) : ", response);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateMedicalRecord = (
//   address,
//   userAddress,
//   recordId,
//   description
// ) => {
//   try {
//     StorageContract.methods
//       .updateMedicalRecord(userAddress, recordId, description)
//       .send({ from: address, gas: 600000 })
//       .then((response) => {
//         console.log("Response (updateMedicalRecord) : ", response);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteMedicalRecord = (address, userAddress, recordId) => {
//   try {
//     StorageContract.methods
//       .deleteMedicalRecord(userAddress, recordId)
//       .send({ from: address, gas: 600000 })
//       .then((response) => {
//         console.log("Response (deleteMedicalRecord) : ", response);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export function userDataToJson(response) {
//   return {
//     userAddress: response.userAddress,
//     name: response.name,
//     birthday: response.birthday,
//     illness: response.illness,
//     descriptions: response.descriptions,
//     medicalRecords: response.medicalRecords,
//   };
// }

// export function userCredToJson(response) {
//   return {
//     userAddress: response[0],
//     username: response[1],
//     password: response[2],
//     createdAt: response[3],
//     role: response[4],
//   };
// }
