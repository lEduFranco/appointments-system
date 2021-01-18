import { useEffect } from 'react';

import api from '../../services/api';

interface GetProviders {
  day: number;
  month: number;
  year: number;
  period: string;
  frequency: string;
  setProviders: Function;
}

interface Response {
  data: Array<Data>;
}

interface Data {
  id: string;
  user: {
    user_profile: {
      firstname: string;
      lastname: string;
    };
  };
}

const useGetProviders = ({
  day,
  month,
  year,
  period,
  frequency,
  setProviders,
}: GetProviders): void => {
  async function getProviders(): Promise<void> {
    const { data }: Response = await api.get(
      `/providers?day=${day}&month=${month}&year=${year}&period=${period}&frequency=${frequency}`,
    );

    const mapProviders = data.map(({ id, user }) => ({
      value: id,
      label: `${user.user_profile.firstname} ${user.user_profile.lastname}`,
    }));

    setProviders(mapProviders);
  }

  useEffect(() => {
    if (
      (period && frequency && day && month && year) ||
      (period && frequency && day && month === 0 && year)
    ) {
      getProviders();
    }
  }, [day, frequency, month, period, year]);
};

export default useGetProviders;
