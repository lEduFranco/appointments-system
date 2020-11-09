import React, { useState, useEffect } from 'react';

import { FiPower, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProviderItem, { Provider } from '../../components/ClientItem';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  ProvidersList01,
} from './styles';

import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

const ListClient: React.FC = () => {
  const [providers, setProviders] = useState([]);
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="ToMaisVip" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Clientes</h1>

          <Link to="/list-providers">
            <FiUser />
            Diaristas
          </Link>
        </Schedule>

        <ProvidersList01>
          {providers.map((provider: Provider) => {
            return <ProviderItem key={provider.id} provider={provider} />;
          })}
        </ProvidersList01>
      </Content>
    </Container>
  );
};

export default ListClient;
