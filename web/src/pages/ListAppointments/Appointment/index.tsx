import React, { useState } from 'react';
import has from 'lodash/has';
import { FiMoreHorizontal } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import {
  Container,
  AppointmentAvailability,
  AppointmentUnavailable,
  StyledModal,
  StyleModalDelete,
} from './styles';

interface AppointmentsProvider {
  provider: string;
  appointments: Appointments;
}

interface Appointments {
  integral?: AppointmentProps;
  part_time_morning?: AppointmentProps;
  part_time_afternoon?: AppointmentProps;
}

interface AppointmentProps {
  id: string;
  date: Date;
  frequency: string;
  neighborhood: string;
  address: string;
  number: string;
  provider: {
    user: {
      user_profile: {
        cel: string;
        tel: string;
        firstname: string;
        lastname: string;
      };
    };
  };
  client: {
    user: {
      user_profile: {
        cel: string;
        tel: string;
        firstname: string;
        lastname: string;
      };
    };
  };
}

interface Props {
  appointment?: AppointmentProps;
  isUnavailability?: boolean | undefined;
  setAppointments: Function;
}

const Appointment: React.FC<Props> = ({
  appointment,
  isUnavailability,
  setAppointments,
}) => {
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

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

  function toggleModal(): void {
    setIsOpen(!isOpen);
  }
  function toggleModalDelete(): void {
    setIsOpenDelete(!isOpenDelete);
  }

  function deleteAppointment(): void {
    api
      .delete('/appointments', {
        data: {
          id: appointment?.id,
        },
      })
      .then((response) => {
        toggleModal();

        setAppointments((prevState: AppointmentsProvider[]) => {
          const result = prevState.filter(
            (item) =>
              item.appointments.integral?.id !== appointment?.id &&
              item.appointments.part_time_morning?.id !== appointment?.id &&
              item.appointments.part_time_afternoon?.id !== appointment?.id,
          );

          return result;
        });

        addToast({
          type: 'success',
          title: 'Agendamento Deletado com Sucesso!',
          description: response.data.message,
        });
      })
      .catch((error) => {
        toggleModal();
        addToast({
          type: 'error',
          title: 'Erro ao deletar !',
          description:
            'Ocorreu um erro ao deletar o agendamento, tente novamente',
        });
      });
  }

  function deleteAllAppointments(): void {
    api
      .delete('/appointments/all-appointments', {
        data: {
          id: appointment?.id,
        },
      })
      .then((response) => {
        toggleModal();

        setAppointments((prevState: AppointmentsProvider[]) => {
          const result = prevState.filter(
            (item) =>
              item.appointments.integral?.id !== appointment?.id &&
              item.appointments.part_time_morning?.id !== appointment?.id &&
              item.appointments.part_time_afternoon?.id !== appointment?.id,
          );

          return result;
        });

        addToast({
          type: 'success',
          title: 'Agendamento Deletado com Sucesso!',
          description: response.data.message,
        });
      })
      .catch((error) => {
        toggleModal();
        addToast({
          type: 'error',
          title: 'Erro ao deletar !',
          description:
            'Ocorreu um erro ao deletar o agendamento, tente novamente',
        });
      });
  }

  return (
    <>
      <Container>
        <h1>
          {appointment?.client.user.user_profile.firstname}{' '}
          {appointment?.client.user.user_profile.lastname}
        </h1>
        <h3>{appointment?.neighborhood}</h3>
        <p className="address">
          {appointment?.address} {appointment?.number}
        </p>
        <p>{appointment?.client.user.user_profile.cel}</p>
        <p>{getFrequencyName(appointment?.frequency)}</p>

        <button type="button" onClick={toggleModal}>
          <FiMoreHorizontal />
        </button>

        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <div className="modal">
            <div className="dados">
              <h1>
                {appointment?.client.user.user_profile.firstname}{' '}
                {appointment?.client.user.user_profile.lastname}
              </h1>
              <p className="address">
                {appointment?.address} {appointment?.number}
              </p>
              <p className="contact">
                {appointment?.client.user.user_profile.cel}{' '}
                {appointment?.client.user.user_profile.tel}
              </p>
              <p>{getFrequencyName(appointment?.frequency)}</p>
            </div>

            <div className="textarea-block">
              <textarea />
            </div>
            <div className="container-buttons">
              <button
                type="button"
                onClick={toggleModalDelete}
                className="close"
              >
                Deletar
              </button>
              <StyleModalDelete
                isOpen={isOpenDelete}
                onBackgroundClick={toggleModalDelete}
                onEscapeKeydown={toggleModalDelete}
              >
                <div className="div-delete">
                  <input type="radio" name="Delete" value="sim" /> Deletar
                  apenas este agendamento.
                  <br />
                  <input type="radio" name="Delete" value="nao" /> Deletar este
                  agendamento e os futuros.
                  <br />
                </div>
              </StyleModalDelete>
              <div>
                <button type="button" className="edit">
                  <Link to="edit-appointments">Editar</Link>
                </button>
                <button type="button" onClick={toggleModal} className="save">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </StyledModal>
      </Container>
    </>
  );
};

export default Appointment;
