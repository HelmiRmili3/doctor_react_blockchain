import React, { useState } from "react";
import Calendar from "../components/calender";
import AppointmentForm from "../components/appointment_form";
import { useAuth } from "../contexts/auth_context";
import { usePatient } from "../contexts/patient_context";
function UserDashboard() {
  const [events, setEvents] = useState([]);
  const { logOut, currentUser } = useAuth();
  const { addAppointment, appointments, setAppointments, userData } =
    usePatient();
  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
  };

  const addEvent = (newEvent) => {
    // Automatically set end date to one hour after the start date
    const startDate = new Date(newEvent.start);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    newEvent.end = endDate.toISOString();

    // Validate appointment time range
    const startTime = startDate.getHours();
    const endTime = endDate.getHours();
    if (startTime < 8 || endTime >= 20) {
      alert("Appointments must be between 8:00 AM and 8:00 PM.");
      return;
    }

    // Check for overlapping events
    const isOverlapping = appointments.some(
      (event) =>
        (new Date(newEvent.start) >= new Date(event.start) &&
          new Date(newEvent.start) < new Date(event.end)) ||
        (new Date(newEvent.end) > new Date(event.start) &&
          new Date(newEvent.end) <= new Date(event.end))
    );

    if (!isOverlapping) {
      setEvents([...events, newEvent]);
      console.log(events);
      addAppointment(startDate.toString());
    } else {
      alert("Appointment overlaps with existing appointment.");
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
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white shadow sm:rounded-lg px-4 py-6">
              <Calendar events={appointments} />
            </div>
            <div className="bg-white shadow sm:rounded-lg px-4 py-6">
              <AppointmentForm addEvent={addEvent} />
            </div>
          </div>
          <div className="mt-8 bg-white shadow sm:rounded-lg p-6">
            {userData && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Profile
                </h2>
                <div className="bg-gray-100 rounded p-4">
                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Illness:</strong> {userData.illness}
                  </p>
                  <h3 className="text-md font-semibold text-gray-900 mt-4">
                    Appointments
                  </h3>
                  <ul className="mt-2">
                    {userData.appointments.map((appointment, index) => (
                      <li key={index} className="mt-2 border-t pt-2">
                        <p>
                          <strong>Appointment:</strong> {index}
                        </p>
                        <p>
                          <strong>Date:</strong> {appointment.date}
                        </p>
                        <p>
                          <strong>Medical Record:</strong>{" "}
                          {appointment.medicalRecord}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {appointment.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
