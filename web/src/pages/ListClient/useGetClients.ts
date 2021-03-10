import { useEffect } from 'react';

import api from '../../services/api';

interface GetProviders {
  setClients: Function;
  autoCompleteValue: string;
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

const useGetClients = ({
  setClients,
  autoCompleteValue,
}: GetProviders): void => {
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
