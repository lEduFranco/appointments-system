import React, { useState } from 'react';

import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';

import { Header, HeaderTop, HeaderRoutesStyle } from './styles';

import AdminMenu from './AdminMenu';
import SecretaryMenu from './SecretaryMenu';
import RhMenu from './RhMenu';

const HeaderVertival: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Header>
      <HeaderTop>
        <img src={logoImg} alt="ToMaisVip" />

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderTop>
      <HeaderRoutesStyle>
        {user.role === 'admin' && <AdminMenu />}
        {user.role === 'secretary' && <SecretaryMenu />}
        {user.role === 'rh' && <RhMenu />}
      </HeaderRoutesStyle>
    </Header>
  );
};

export default HeaderVertival;
