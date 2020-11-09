import React, { useState, useEffect } from 'react';

import { FiLogIn, FiPower, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProviderItem, { Provider } from '../../components/ProviderItem';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  ProvidersList01,
  CreateAccont,
} from './styles';

import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

const ListProviders: React.FC = () => {
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
          <h1>Diaristas</h1>

          <Link to="/list-client">
            <FiUser />
            Clientes
          </Link>
        </Schedule>

        <ProvidersList01>
          {providers.map((provider: Provider) => {
            return <ProviderItem key={provider.id} provider={provider} />;
          })}
        </ProvidersList01>

        <CreateAccont>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </CreateAccont>
      </Content>
    </Container>
  );
};

export default ListProviders;
