import Web3 from "web3";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { AuthContract, StorageContract, signUp } from "../utils/contracts";
import { useWallet } from "./wallet_context";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const web3 = new Web3("http://localhost:7545");

  const { wallet } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [update, setUpdate] = useState(false);

  const signup = async (useraddress, username, password) => {
    signUp(wallet, useraddress, username, password);
  };

  const signin = (password) => {
    const hashedPassword = web3.utils.sha3(password);
    console.log(hashedPassword);
    if (currentUser && currentUser.password === hashedPassword) {
      setIsLoggedIn(true);
    }
  };

  const addUser = async (
    userAddress,
    name,
    image,
    birthday,
    illness,
    password
  ) => {
    if (wallet != null) {
      const hashedPassword = web3.utils.sha3(password);
      console.log(hashedPassword);
      try {
        await AuthContract.methods
          .addUser(userAddress, name, hashedPassword, image)
          .send({ from: wallet, gas: 600000 })
          .then((response) => {
            console.log("Response Auth (addUser) : ", response);
          });
        await StorageContract.methods
          .addUser(userAddress, name, birthday, illness, image)
          .send({ from: wallet, gas: 600000 })
          .then((response) => {
            console.log("Response Storage (addUser) : ", response);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logOut = () => {
    setIsLoggedIn(false);
  };

  const fetchUserData = useCallback(async () => {
    if (wallet) {
      const response = await AuthContract.methods
        .getUserData(wallet)
        .call({ from: wallet });
      setCurrentUser({
        userAddress: response[0],
        username: response[1],
        password: response[2],
        createdAt: response[3],
        role: response[4],
        image: response[5],
      });
      console.log(response);
    }
    logOut();
  }, [wallet]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        update,
        setUpdate,
        addUser,
        signin,
        signup,
        logOut,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
