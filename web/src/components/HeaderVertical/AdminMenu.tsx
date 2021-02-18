import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiPlus, FiList, FiUser } from 'react-icons/fi';

const AdminHeaderRoutes: React.FC = () => {
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
      <Link to="/create-providers">
        <FiUser />
        Cadastrar Diarista
      </Link>
      <Link to="/list-clients">
        <FiList />
        Lista de Clientes
      </Link>
      <Link to="/list-providers">
        <FiList />
        Lista de Diaristas
      </Link>
      <Link to="/create-appointments">
        <FiPlus />
        Cadastrar Agendamento
      </Link>
    </>
  );
};

export default AdminHeaderRoutes;
