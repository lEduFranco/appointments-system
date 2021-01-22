import { useEffect } from 'react';

import api from '../../services/api';

interface GetClients {
  setClients: Function;
}

interface Response {
  data: Array<Data>;
}

interface Address {
  neighborhood: string;
  number: string;
  address: string;
  complement: string;
  reference_points: string;
  nearest_subway_station: string;
}

interface Data {
  id: string;
  user: {
    addresses: Address[];
    user_profile: {
      firstname: string;
      lastname: string;
    };
  };
}

const useGetClients = ({ setClients }: GetClients): void => {
  async function getClients(): Promise<void> {
    const { data }: Response = await api.get('/clients');

    setClients(data);
  }

  useEffect(() => {
    getClients();
  }, []);
};

export default useGetClients;
