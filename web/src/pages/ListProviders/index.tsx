import React, { useState } from 'react';

import HeaderVertical from '../../components/HeaderVertical';

import useGetProviders from './useGetProviders';

import {
  Container,
  Content,
  Div,
  Schedule,
  Search,
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
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  useGetProviders({
    setProviders,
    autoCompleteValue,
  });

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Div>
          <Schedule>
            <h1>Diaristas</h1>
          </Schedule>

          <Search>
            <input
              onChange={(event) => setAutoCompleteValue(event.target.value)}
              value={autoCompleteValue}
              placeholder="Digite nome/sobrenome"
            />
          </Search>

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
        </Div>
      </Content>
    </Container>
  );
};

export default ListProviders;
