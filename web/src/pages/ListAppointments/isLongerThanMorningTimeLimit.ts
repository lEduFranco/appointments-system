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
  neighborhood: string;
  address: string;
  number: string;
  provider: {
    user: {
      user_profile: {
        cel: string;
        tel: string;
        firstname: string;
        lastname: string;
      };
    };
  };
  client: {
    user: {
      user_profile: {
        cel: string;
        tel: string;
        firstname: string;
        lastname: string;
      };
    };
  };
}

const isLongerThanMorningTimeLimit = ({
  daySelected,
  appointments,
}: Props): boolean => {
  const dateNow = new Date(Date.now());
  const timeLimitPartTimeMorning = setHours(startOfDay(dateNow), 6);

  return (
    isToday(new Date(daySelected)) &&
    isAfter(new Date(Date.now()), timeLimitPartTimeMorning) &&
    !has(appointments, 'part_time_morning')
  );
};

export default isLongerThanMorningTimeLimit;
