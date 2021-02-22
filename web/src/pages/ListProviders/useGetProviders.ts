import { useEffect } from 'react';

import api from '../../services/api';

interface GetProviders {
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

const useGetProviders = ({ setProviders }: GetProviders): void => {
  async function getProviders(): Promise<void> {
    const { data }: Response = await api.get('/providers/show-providers');

    setProviders(data);
    console.log(data);
  }

  useEffect(() => {
    getProviders();
  }, []);
};

export default useGetProviders;
