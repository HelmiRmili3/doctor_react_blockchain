import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar({ events }) {
  // console.log(events);
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{ left: 'prev,next', center: 'title', right: 'timeGridWeek,timeGridDay' }}
      events={events}
      validRange={{
        start: '08:00',
        end: '20:00'
      }}
    />
  );
}

export default Calendar;
