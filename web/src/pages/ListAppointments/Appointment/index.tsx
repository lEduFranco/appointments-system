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
  const [typeDeleteAppointment, setTypeDeleteAppointment] = useState();

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
          title: 'Agendamento deletado com Sucesso!',
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

  function deleteAllFutureAppointments(): void {
    api
      .delete('/appointments/allfuture-appointments', {
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
          title: 'Agendamentos deletados com Sucesso!',
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

  function checkDelete(): void {
    if (typeDeleteAppointment === 'onlyAppointment') {
      deleteAppointment();
    }

    if (typeDeleteAppointment === 'futureAppointments') {
      deleteAllFutureAppointments();
    }
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
                className="delete"
              >
                Deletar
              </button>
              <StyleModalDelete
                isOpen={isOpenDelete}
                onBackgroundClick={toggleModalDelete}
                onEscapeKeydown={toggleModalDelete}
              >
                <div
                  className="div-delete"
                  onChange={(event) => {
                    setTypeDeleteAppointment(event.target.value);
                  }}
                >
                  <input
                    type="radio"
                    name="radio-delete"
                    value="onlyAppointment"
                  />{' '}
                  Deletar apenas este agendamento.
                  <br />
                  <input
                    type="radio"
                    name="radio-delete"
                    value="futureAppointments"
                  />{' '}
                  Deletar este agendamento e os futuros.
                  <br />
                </div>
                <div className="container-buttons">
                  <button
                    type="button"
                    onClick={toggleModalDelete}
                    className="close"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    onClick={checkDelete}
                    className="confirmed"
                  >
                    Confirmar
                  </button>
                </div>
              </StyleModalDelete>
              <div>
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
