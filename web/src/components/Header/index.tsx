import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';

import { Header, HeaderContent } from './styles';

const HeaderHorizontal: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="ToMaisVip" />

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Header>
  );
};

export default HeaderHorizontal;
