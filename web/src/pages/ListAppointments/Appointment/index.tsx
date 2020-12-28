import React from 'react';
import has from 'lodash/has';

import {
  Container,
  AppointmentAvailability,
  AppointmentUnavailable,
} from './styles';

interface AppointmentProps {
  id: string;
  date: Date;
  frequency: string;
  user: {
    name: string;
    addresses: {
      neighborhood: string;
      address: string;
      number: string;
    };
    user_profiles: {
      cel: string;
    };
    clients: {
      condominium_name: string;
    };
  };
}

interface Props {
  appointment?: AppointmentProps;
  isUnavailability?: boolean | undefined;
}

const Appointment: React.FC<Props> = ({ appointment, isUnavailability }) => {
  function getFrequencyName(frequency?: string): string {
    if (frequency === 'weekly') {
      return 'Semanal';
    }

    if (frequency === 'biweekly') {
      return 'Quinzenal';
    }

    if (frequency === 'monthly') {
      return 'Avulso';
    }

    return 'Primeira Diária';
  }

  if (isUnavailability) {
    return (
      <AppointmentUnavailable>
        <h1>Indisponível</h1>
      </AppointmentUnavailable>
    );
  }

  if (!has(appointment, 'id')) {
    return (
      <AppointmentAvailability>
        <h1>Disponível</h1>
      </AppointmentAvailability>
    );
  }

  return (
    <Container>
      <h1>{appointment?.user.name}</h1>
      <h3>{appointment?.user.addresses.neighborhood}</h3>
      <ul>
        <ul>{appointment?.user.addresses.address}</ul>
        <ul>{appointment?.user.clients.condominium_name}</ul>
        <ul>{appointment?.user.addresses.number}</ul>
      </ul>
      <ul>{appointment?.user.user_profiles.cel}</ul>
      <p>{getFrequencyName(appointment?.frequency)}</p>
    </Container>
  );
};

export default Appointment;
