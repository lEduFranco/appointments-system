import React from 'react';

import { FiTrash2, FiEdit2, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ProviderContainer } from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface ProviderItemProps {
  provider: Provider;
}

const clientItem: React.FC<ProviderItemProps> = ({ provider }) => {
  return (
    <ProviderContainer>
      <div>
        <img src={provider.avatar_url} alt={provider.name} />

        <strong>{provider.name} </strong>
        <p>E-mail: {provider.email}</p>

        <Link className="agenda" to="/dashboard">
          <FiCalendar size={20} color="#a8a8b3" />
        </Link>

        <Link className="edit" to="/profile">
          <FiEdit2 size={20} color="#a8a8b3" />
        </Link>

        <Link to="/profile">
          <FiTrash2 size={20} color="#a8a8b3" />
        </Link>
      </div>
    </ProviderContainer>
  );
};

export default clientItem;
