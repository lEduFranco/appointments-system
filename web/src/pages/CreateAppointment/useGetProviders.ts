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
  name: string;
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

    const mapProviders = data.map(({ id, name }) => ({
      value: id,
      label: name,
    }));

    setProviders(mapProviders);
  }

  useEffect(() => {
    if (period && frequency && day && month && year) {
      getProviders();
    }
  }, [day, frequency, month, period, year]);
};

export default useGetProviders;
