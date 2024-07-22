// src/components/WorkHours.tsx

import React from 'react';

const workingHours = {
  Mon: "6:00 am - 6:00 pm",
  Tue: "6:00 am - 6:00 pm",
  Wed: "6:00 am - 6:00 pm",
  Thu: "6:00 am - 6:00 pm",
  Fri: "6:00 am - 6:00 pm",
  Sat: "6:00 am - 6:00 pm",
  Sun: "10:00 am - 6:00 pm"
};

const dayMapping: { [key: string]: string } = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday"
};

const formattedWorkingHours = Object.entries(workingHours).map(([day, hours]) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }) as keyof typeof dayMapping;
  const isToday = day === today;

  return {
    day: dayMapping[day],
    hours,
    isToday
  };
});

const WorkHours: React.FC = () => {
  return (
    <div className='md:mt-5'>
      <h1 className="md:py-2">Work hours (WAT)</h1>
      {formattedWorkingHours.map(({ day, hours, isToday }, index) => (
        <p key={index} className={isToday ? 'font-bold text-slate-700 text-xs py-2' : 'text-xs text-slate-600 py-2'}>
          {day}: {hours}
        </p>
      ))}
    </div>
  );
};

export default WorkHours;
