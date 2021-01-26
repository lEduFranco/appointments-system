import { useEffect } from 'react';

import api from '../../services/api';

interface GetClients {
  autoCompleteValue: string;
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

const useGetClients = ({ setClients, autoCompleteValue }: GetClients): void => {
  async function getClients(): Promise<void> {
    const { data }: Response = await api.get(
      `/clients?nameFilter=${autoCompleteValue}`,
    );

    setClients(data);
  }

  useEffect(() => {
    if (autoCompleteValue.length >= 3) {
      getClients();
    } else {
      setClients([]);
    }
  }, [autoCompleteValue]);
};

export default useGetClients;
