import { useEffect } from 'react';

import api from '../../services/api';

interface GetProviders {
  setProviders: Function;
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

const useGetProviders = ({
  setProviders,
  autoCompleteValue,
}: GetProviders): void => {
  async function getProviders(): Promise<void> {
    const { data }: Response = await api.get(
      `/providers/search?nameFilter=${autoCompleteValue}`,
    );

    setProviders(data);
  }

  useEffect(() => {
    if (autoCompleteValue.length >= 3) {
      getProviders();
    } else {
      setProviders([]);
    }
  }, [autoCompleteValue]);
};

export default useGetProviders;
