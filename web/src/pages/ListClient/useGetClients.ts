import { useEffect } from 'react';

import api from '../../services/api';

interface GetProviders {
  setClients: Function;
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

const useGetClients = ({ setClients }: GetProviders): void => {
  async function getClients(): Promise<void> {
    const { data }: Response = await api.get('/clients/show-clients');

    setClients(data);
  }

  useEffect(() => {
    getClients();
  }, []);
};

export default useGetClients;
