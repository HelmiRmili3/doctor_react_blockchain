import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Web3 from "web3";
import { StorageContract } from "../utils/contracts";
import { useWallet } from "./wallet_context";
import { useAuth } from "./auth_context";

const PatientContext = createContext();

export function usePatient() {
  return useContext(PatientContext);
}

export const PatientProvider = ({ children }) => {
  const { wallet } = useWallet();
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState();

  const fetchAppointments = useCallback(async () => {
    function transformArray(input) {
      return input.map((item) => {
        const startDate = new Date(item[1]);
        return {
          title: item[2] === currentUser.username ? item[2] : "",
          start: startDate,
          end: new Date(startDate.getTime() + 60 * 60 * 1000), // Add 1 hour to start date
        };
      });
    }
    if (wallet) {
      try {
        const response = await StorageContract.methods
          .getAllAppointments(wallet)
          .call();
        const result = transformArray(response);
        console.log(result);
        setAppointments(result);
        const user = await StorageContract.methods
          .getUser(wallet)
          .call({ gas: 600000 });
        console.log(user);
        const userData = {
          address: wallet,
          name: user[0],
          birthday: user[1],
          illness: user[2],
          image: user[3],
          appointments: user[4].map((appointment) => ({
            date: appointment.date,
            medicalRecord: appointment.medicalRecord,
            description: appointment.description,
          })),
        };
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
  }, [wallet, currentUser.name]);
  const addAppointment = useCallback(
    (date) => {
      if (!wallet || !currentUser) {
        console.error("User address or current user is missing");
        return;
      }
      try {
        StorageContract.methods
          .addAppointment(wallet, date, currentUser.username)
          .send({
            from: wallet,
            value: Web3.utils.toWei("0.1", "ether"),
            gas: 600000,
          })
          .then((response) => {
            console.log("Response (addAppointment):", response);
            fetchAppointments();
          })
          .catch((error) => {
            console.error("Error in transaction:", error);
          });
      } catch (error) {
        console.error("Error calling addAppointment:", error);
      }
    },
    [wallet, currentUser, fetchAppointments]
  );
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <PatientContext.Provider
      value={{ addAppointment, appointments, userData, currentUser }}
    >
      {children}
    </PatientContext.Provider>
  );
};
