import has from 'lodash/has';
import { isAfter, setHours, startOfDay, isToday } from 'date-fns';

interface Props {
  daySelected: Date;
  appointments: Appointments;
}

interface Appointments {
  integral?: Appointment;
  part_time_morning?: Appointment;
  part_time_afternoon?: Appointment;
}

interface Appointment {
  id: string;
  date: Date;
  frequency: string;
  user: {
    name: string;
    email: string;
  };
}

const isLongerThanAfternoonTimeLimit = (
  appointments: Appointments,
): boolean => {
  const dateNow = new Date(Date.now());

  const timeLimitPartTimeAfternoon = setHours(startOfDay(dateNow), 12);

  return (
    isToday(new Date(Date.now())) &&
    isAfter(new Date(Date.now()), timeLimitPartTimeAfternoon) &&
    !has(appointments, 'part_time_afternoon')
  );
};

export default isLongerThanAfternoonTimeLimit;
