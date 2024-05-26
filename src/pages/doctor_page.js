import React, { useState, useRef } from "react";
import Calendar from "../components/calender";
import { useAuth } from "../contexts/auth_context";
import { useDoctor } from "../contexts/doctor_context";
function DashboardPage() {
  const {
    appointments,
    addresses,
    fetchXuserData,
    updateAppointment,
    deleteUser,
    usersData,
    setUsersData,
  } = useDoctor();
  const { logOut, addUser, currentUser, update, setUpdate } = useAuth();
  const [searchAddress, setSearchAddress] = useState("");
  const [userData, setUserData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  const [userForm, setUserForm] = useState({
    userAddress: "",
    name: "",
    image: "",
    birthday: "",
    illness: "",
    password: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const confirmationRef = useRef(null);

  const deleteUsers = async () => {
    try {
      await deleteUser(userToDelete);
      // const newUsers = usersData.filter((_, i) => i !== index);
      // setUsersData(newUsers);
      setUserToDelete(null);
      setShowConfirmation(false);
    } catch (error) {}
  };

  const openConfirmation = (e, index) => {
    setUserToDelete(usersData[index].address);
    const rect = e.target.getBoundingClientRect();
    const posX = rect.right + window.scrollX - 350;
    const posY = rect.top + window.scrollY;
    confirmationRef.current.style.left = `${posX}px`;
    confirmationRef.current.style.top = `${posY}px`;
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setUserToDelete(null);
    setShowConfirmation(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log(userForm);
    setUsersData([...usersData, userForm]);
    setUserForm({
      address: "",
      name: "",
      image: "",
      birthday: "",
      illness: "",
      password: "",
    });
  };

  const addUserToTheBlockchain = async () => {
    await addUser(
      userForm.userAddress,
      userForm.name,
      userForm.image,
      userForm.birthday,
      userForm.illness,
      userForm.password
    );
    setUpdate(!update);
  };

  const handleSearch = async () => {
    console.log(addresses);
    console.log(searchAddress);
    try {
      const data = await fetchXuserData(searchAddress);
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index, field) => {
    setEditIndex(index);
    setEditField(field);
    const value = userData.appointments[index][field];
    setEditValue(value !== undefined ? value : ""); // Set a default value if undefined
  };

  const handleSave = async () => {
    const updatedAppointments = [...userData.appointments];
    updatedAppointments[editIndex][editField] = editValue;
    setUserData({ ...userData, appointments: updatedAppointments });
    setEditIndex(null);
    setEditField("");
    console.log(userData);
    try {
      await updateAppointment(
        userData.address,
        editIndex,
        userData.appointments[editIndex].date,
        userData.name,
        userData.appointments[editIndex].medicalRecord,
        userData.appointments[editIndex].description
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow rounded-lg p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between space-x-6">
          <div className="flex items-center space-x-6">
            <img
              src={currentUser.image}
              alt={`${currentUser.username}'s profile`}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {currentUser.username}
              </h1>
              <p className="text-gray-700">{currentUser.userAddress}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white shadow sm:rounded-lg px-4 py-12">
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome to your dashboard!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Here you can manage your appointments, view your schedule, and
                more.
              </p>
              <Calendar events={appointments} />
            </div>
            <div className="bg-white shadow sm:rounded-lg px-4 py-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Add User</h2>
              <form onSubmit={handleAddUser}>
                <div className="mb-4">
                  <label
                    htmlFor="userAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="userAddress"
                    name="userAddress"
                    value={userForm.userAddress}
                    onChange={(e) =>
                      setUserForm({ ...userForm, userAddress: e.target.value })
                    }
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={userForm.image}
                    onChange={(e) =>
                      setUserForm({ ...userForm, image: e.target.value })
                    }
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={userForm.birthday}
                    onChange={(e) =>
                      setUserForm({ ...userForm, birthday: e.target.value })
                    }
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="illness"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Illness
                  </label>
                  <input
                    type="text"
                    id="illness"
                    name="illness"
                    value={userForm.illness}
                    onChange={(e) =>
                      setUserForm({ ...userForm, illness: e.target.value })
                    }
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <button
                    onClick={addUserToTheBlockchain}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Add User
                  </button>
                </div>
              </form>
              <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  User List
                </h2>
                <ul className="divide-y divide-gray-200">
                  {usersData.map((user, index) => (
                    <li
                      key={index}
                      className="py-4 flex justify-between items-center"
                    >
                      <img
                        src={user.image}
                        alt={`${user.name}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.address ? user.address.substring(0, 16) : ""}
                        </p>
                      </div>
                      <button
                        onClick={(e) => openConfirmation(e, index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white shadow sm:rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Search User Data
            </h2>
            <div className="flex mb-4">
              <select
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={address.value}>
                    {address.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleSearch}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </div>
            {userData && (
              <div className="mt-8">
                {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  User
                </h2> */}
                <div className="bg-gray-100 rounded p-4">
                  <div class="flex flex-col items-center">
                    <img
                      src={userData.image}
                      alt={`${userData.name}'s profile`}
                      class="w-24 h-24 rounded-full object-cover"
                    />
                    <div class="w-full h-px bg-gray-300 mt-4"></div>
                  </div>
                  <div class="p-1">
                    <p>
                      <strong>Address:</strong> {userData.address}
                    </p>
                    <p>
                      <strong>Name:</strong> {userData.name}
                    </p>
                    <p>
                      <strong>Illness:</strong> {userData.illness}
                    </p>
                  </div>

                  <h3 className="text-md font-semibold text-gray-900 mt-4">
                    Appointments
                  </h3>
                  <ul className="mt-2">
                    {userData.appointments.map((appointment, index) => (
                      <li key={index} className="mt-2 border-t pt-2">
                        <p>
                          <strong>Appointment :</strong> {index}
                        </p>
                        <p>
                          <strong>Date:</strong> {appointment.date}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            {editIndex === index &&
                            editField === "medicalRecord" ? (
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button
                                  type="button"
                                  onClick={handleSave}
                                  className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <p>
                                <strong>Medical Record:</strong>{" "}
                                {appointment.medicalRecord}
                              </p>
                            )}
                            {editIndex === index &&
                            editField === "description" ? (
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button
                                  type="button"
                                  onClick={handleSave}
                                  className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <p>
                                <strong>Description:</strong>{" "}
                                {appointment.description}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <button
                              type="button"
                              onClick={() => handleEdit(index, "medicalRecord")}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none focus:shadow-outline"
                            >
                              Modify Medical Record
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEdit(index, "description")}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Modify Description
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <div
                ref={confirmationRef}
                className={`absolute bg-white p-8 rounded-lg shadow-lg ${
                  showConfirmation ? "block" : "hidden"
                }`}
              >
                <p className="mb-4">
                  Are you sure you want to delete this user?
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={deleteUsers}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Yes
                  </button>
                  <button
                    onClick={closeConfirmation}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
