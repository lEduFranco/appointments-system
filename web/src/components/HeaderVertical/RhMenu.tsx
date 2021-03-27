import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiList, FiUser } from 'react-icons/fi';

const RhHeaderRoutes: React.FC = () => {
  return (
    <>
      <Link to="/create-providers">
        <FiUser />
        Cadastrar Diarista
      </Link>
      <Link to="/list-providers">
        <FiList />
        Lista de Diaristas
      </Link>
      <Link to="/reports">
        <FiFileText />
        Relatórios
      </Link>
    </>
  );
};

export default RhHeaderRoutes;
