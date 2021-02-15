import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiPlus, FiPower, FiUser } from 'react-icons/fi';
import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';

import { Header, HeaderTop, HeaderRoutes } from './styles';

const HeaderVertival: React.FC = () => {
  const { signOut, user } = useAuth();

  function HeaderRoute() {
    try {
      if (user.role === 'secretary') {
        return HeaderRoutes;
      }
    } catch {}
  }

  return (
    <Header>
      <HeaderTop>
        <img src={logoImg} alt="ToMaisVip" />

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderTop>
      <HeaderRoutes onChange={HeaderRoute}>
        <Link to="/list-appointments">
          <FiCalendar />
          Agenda
        </Link>
        <Link to="/create-client">
          <FiUser />
          Cadastrar Cliente
        </Link>
        <Link to="/create-appointments">
          <FiPlus />
          Cadastrar Agendamento
        </Link>
        <Link to="/create-providers">
          <FiUser />
          Cadastrar Diarista
        </Link>
      </HeaderRoutes>
    </Header>
  );
};

export default HeaderVertival;
