import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';

import { Header, HeaderContent, Profile } from './styles';

const HeaderComponent: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
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
  );
};

export default HeaderComponent;
