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
    addresses: {
      neighborhood: string;
      address: string;
      number: string;
    };
    user_profiles: {
      cel: string;
    };
    clients: {
      condominium_name: string;
    };
  };
}

const isLongerThanIntegralTimeLimit = ({
  daySelected,
  appointments,
}: Props): boolean => {
  const dateNow = new Date(Date.now());
  const timeLimitPartTimeintegral = setHours(startOfDay(dateNow), 10);

  return (
    isToday(new Date(daySelected)) &&
    isAfter(new Date(Date.now()), timeLimitPartTimeintegral) &&
    !has(appointments, 'integral')
  );
};

export default isLongerThanIntegralTimeLimit;
