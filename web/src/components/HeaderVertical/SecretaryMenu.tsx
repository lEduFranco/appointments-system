import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiFileText, FiList, FiPlus, FiUser } from 'react-icons/fi';

const SecretaryHeaderRoutes: React.FC = () => {
  return (
    <>
      <Link to="/list-appointments">
        <FiCalendar />
        Agenda
      </Link>
      <Link to="/create-clients">
        <FiUser />
        Cadastrar Cliente
      </Link>
      <Link to="/list-clients">
        <FiList />
        Lista de Clientes
      </Link>
      <Link to="/create-appointments">
        <FiPlus />
        Cadastrar Agendamento
      </Link>
      <Link to="/reports">
        <FiFileText />
        Relatórios
      </Link>
    </>
  );
};

export default SecretaryHeaderRoutes;
