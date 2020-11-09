import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { startOfWeek, addDays, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Content,
  Schedule,
  Appointments,
  Profile,
} from './styles';

import logoImg from '../../assets/logo_top.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const ListAppointments: React.FC = () => {
  const { user, signOut } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [dates, setDates] = useState([]);

  function getDatesBetweenDates(startDate: Date, endDate: Date): void {
    let dates = [];

    const theDate = new Date(startDate);
    while (theDate <= endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }

    setDates(dates);
  }

  async function getAppointments(): Promise<void> {
    const { data: appointmentsData } = await api.get('/appointments', {
      params: {
        year: 2020,
        month: 10,
        day: 27,
      },
    });

    console.log(appointmentsData);

    setAppointments(appointmentsData);
  }

  useEffect(() => {
    getAppointments();

    const startWeek = startOfWeek(new Date(), {
      weekStartsOn: 1,
    });

    const endWeek = addDays(startWeek, 4);

    getDatesBetweenDates(new Date(startWeek), new Date(endWeek));
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="ToMaisVip" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <thead>
            <tr>
              <th />
              {dates.map((date) => (
                <th key={date}>
                  <span>
                    {format(date, 'EEEE', {
                      locale: ptBR,
                    })}
                  </span>
                  <br />
                  <span>{format(date, 'd/M')}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Márcia</td>
              <td>Agendamento marcado pela manhã.</td>
              <td>Agendamento marcado pela manhã.</td>
              <td>Agendamento marcado pela manhã.</td>
              <td>Agendamento marcado pela manhã.</td>
              <td>Agendamento marcado pela manhã.</td>
            </tr>
          </tbody>
        </Schedule>
      </Content>
    </Container>
  );
};
export default ListAppointments;
