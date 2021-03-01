import React, { useState } from 'react';

import HeaderVertical from '../../components/HeaderVertical';

import useGetProviders from './useGetProviders';

import {
  Container,
  Content,
  Schedule,
  ProvidersList,
  Provider,
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

        <ProvidersList>
          {providers.map((provider) => {
            return (
              <Provider>
                <h1>{provider.user.user_profile.firstname}</h1>
                <h2>{provider.user.user_profile.lastname}</h2>
              </Provider>
            );
          })}
        </ProvidersList>
      </Content>
    </Container>
  );
};

export default ListProviders;
