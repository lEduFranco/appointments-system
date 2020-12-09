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
  name: string;
}

const useGetClients = ({ setClients }: GetClients): void => {
  async function getClients(): Promise<void> {
    const { data }: Response = await api.get(`/clients`);

    const mapClients = data.map(({ id, name }) => ({
      value: id,
      label: name,
    }));

    setClients(mapClients);
  }

  useEffect(() => {
    getClients();
  }, []);
};

export default useGetClients;
