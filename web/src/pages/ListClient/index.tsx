import React, { useState } from 'react';

import HeaderVertical from '../../components/HeaderVertical';

import useGetClients from './useGetClients';

import {
  Container,
  Content,
  Div,
  Schedule,
  Search,
  CLientsList,
  Client,
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

const ListClients: React.FC = (Data) => {
  const [clients, setClients] = useState<Data[]>([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  useGetClients({
    setClients,
    autoCompleteValue,
  });

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Div>
          <Schedule>
            <h1>Clientes</h1>
          </Schedule>

          <Search>
            <input
              onChange={(event) => setAutoCompleteValue(event.target.value)}
              value={autoCompleteValue}
              placeholder="Digite nome/sobrenome"
            />
          </Search>

          <CLientsList>
            {clients.map((client) => {
              return (
                <Client>
                  <h1>{client.user.user_profile.firstname}</h1>
                  <h2>{client.user.user_profile.lastname}</h2>
                </Client>
              );
            })}
          </CLientsList>
        </Div>
      </Content>
    </Container>
  );
};

export default ListClients;
