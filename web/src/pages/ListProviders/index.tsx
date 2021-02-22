import React, { useState } from 'react';

import ProviderItem, { Provider } from '../../components/ProviderItem';

import HeaderVertical from '../../components/HeaderVertical';

import useGetProviders from './useGetProviders';

import {
  Container,
  Content,
  Schedule,
  ProvidersList01,
  ListProvider,
} from './styles';

interface Data {
  id: string;
  user: {
    user_profile: {
      firstname: string;
      lastname: string;
    };
  };
}

const ListProviders: React.FC = (Data) => {
  const [providers, setProviders] = useState<Data[]>([]);

  useGetProviders({
    setProviders,
  });

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Schedule>
          <h1>Diaristas</h1>
        </Schedule>

        <ProvidersList01>
          {providers.map((provider) => {
            return <p>{provider.user.user_profile.firstname}</p>;
          })}
        </ProvidersList01>
      </Content>
    </Container>
  );
};

export default ListProviders;
