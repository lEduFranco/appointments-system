import React, { useState } from 'react';

import HeaderVertical from '../../components/HeaderVertical';

import useGetClients from './useGetClients';

import { Container, Content, Schedule, CLientsList, Client } from './styles';

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

  useGetClients({
    setClients,
  });

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Schedule>
          <h1>Clientes</h1>
        </Schedule>

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
      </Content>
    </Container>
  );
};

export default ListClients;
