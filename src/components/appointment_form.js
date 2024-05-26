import React, { useState } from "react";

function AppointmentForm({ addEvent }) {
  const [start, setStart] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      // title,
      start,
    };
    addEvent(newEvent);
    // setTitle("");
    setStart("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="mt-4">
        <label htmlFor="start" className="block text-sm font-medium text-gray-700">
          Start Date and Time
        </label>
        <input
          type="datetime-local"
          id="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Appointment
        </button>
      </div>
    </form>
  );
}

export default AppointmentForm;
