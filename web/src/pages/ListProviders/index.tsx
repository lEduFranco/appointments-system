import React, { useState, useEffect } from 'react';

import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProviderItem, { Provider } from '../../components/ProviderItem';

import HeaderVertical from '../../components/HeaderVertical';

import {
  Container,
  Content,
  Schedule,
  ProvidersList01,
  CreateAccont,
} from './styles';

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
      <HeaderVertical />

      <Content>
        <Schedule>
          <h1>Diaristas</h1>
        </Schedule>

        <ProvidersList01>
          {providers.map((provider: Provider) => {
            return <ProviderItem key={provider.id} provider={provider} />;
          })}
        </ProvidersList01>

        <CreateAccont>
          <Link to="/create-providers">
            <FiUser />
            Cadastrar diarista
          </Link>
        </CreateAccont>
      </Content>
    </Container>
  );
};

export default ListProviders;
