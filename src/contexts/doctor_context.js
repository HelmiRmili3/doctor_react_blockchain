import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { StorageContract } from "../utils/contracts";
import { AuthContract } from "../utils/contracts";
import { useWallet } from "./wallet_context";
import { useAuth } from "./auth_context";
const DoctorContext = createContext();
export function useDoctor() {
  return useContext(DoctorContext);
}
export const DoctorProvider = ({ children }) => {
  const { wallet } = useWallet();
  const { update } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const deleteUser = async (xaddress) => {
    if (xaddress) {
      try {
        await StorageContract.methods
          .deleteUser(xaddress)
          .send({ from: wallet, gas: 6000000 })
          .then((response) => {
            console.log("Response storage (deleteUser) : ", response);
          });
        await AuthContract.methods
          .deleteUser(xaddress)
          .send({ from: wallet, gas: 6000000 })
          .then((response) => {
            console.log("Response auth (deleteUser) : ", response);
          });
        fetchAppointments();
      } catch (error) {
        console.error("Error delete user:", error);
      }
    }
  };
  const fetchXuserData = async (searchAddress) => {
    if (searchAddress) {
      try {
        const user = await StorageContract.methods
          .getUser(searchAddress)
          .call({ from: wallet, gas: 600000 });
        console.log("user data :", user);
        const userData = {
          address: searchAddress,
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
        return userData;
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
  };
  const updateAppointment = async (
    xAddress,
    id,
    newDate,
    username,
    medicalRecord,
    description
  ) => {
    if (xAddress) {
      try {
        await StorageContract.methods
          .updateAppointment(
            xAddress,
            id,
            newDate,
            username,
            medicalRecord,
            description
          )
          .send({
            from: wallet,
            gas: 6000000,
          })
          .then((response) => {
            console.log("Response (updateAppointment) : ", response);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchAppointments = useCallback(async () => {
    try {
      // Fetch all appointments
      const response = await StorageContract.methods
        .getAllAppointments()
        .call({ from: wallet });
      const result = transformArray(response);
      setAppointments(result);

      // Fetch all users
      const usersResponse = await StorageContract.methods
        .fetchAllUsers()
        .call({ from: wallet });
      const usersData = usersResponse.map((user) => ({
        image: user.image,
        address: user.userAddress,
        name: user.name,
      }));
      const usersAddresses = usersResponse.map((user) => ({
        value: user.userAddress,
        label: user.name,
      }));
      setUsersData(usersData);
      setAddresses(usersAddresses);
      console.log("Appointments:", result);
      console.log("Users:", usersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [wallet]);
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, update]);

  function transformArray(input) {
    return input.map((item) => {
      const startDate = new Date(item[1]);
      return {
        title: item[2],
        start: startDate,
        end: new Date(startDate.getTime() + 60 * 60 * 1000),
        medicalRecord: item[3],
        description: item[4],
      };
    });
  }
  return (
    <DoctorContext.Provider
      value={{
        appointments,
        addresses,
        usersData,
        setUsersData,
        fetchXuserData,
        updateAppointment,
        fetchAppointments,
        deleteUser,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
