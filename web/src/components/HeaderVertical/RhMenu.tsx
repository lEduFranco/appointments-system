import React from 'react';
import { Link } from 'react-router-dom';
import { FiList, FiUser } from 'react-icons/fi';

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
    </>
  );
};

export default RhHeaderRoutes;
