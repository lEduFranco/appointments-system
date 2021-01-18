import { useEffect } from 'react';

import api from '../../services/api';

interface GetClients {
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

const useGetClients = ({ setClients }: GetClients): void => {
  async function getClients(): Promise<void> {
    const { data }: Response = await api.get('/clients');

    const mapClients = data.map(({ id, user }) => ({
      value: id,
      label: `${user.user_profile.firstname} ${user.user_profile.lastname}`,
    }));

    setClients(mapClients);
  }

  useEffect(() => {
    getClients();
  }, []);
};

export default useGetClients;
