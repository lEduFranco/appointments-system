import React, { useState, useEffect, useCallback, useMemo } from 'react';
import map from 'lodash/map';
import has from 'lodash/has';

import { format, isToday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';

import { getDate, getMonth, getYear } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPlus, FiUser } from 'react-icons/fi';
import api from '../../services/api';
import HeaderHorizontal from '../../components/Header';

import AppointmentComponent from './Appointment';

import isLongerThanMorningTimeLimit from './isLongerThanMorningTimeLimit';
import isLongerThanAfternoonTimeLimit from './isLongerThanAfternoonTimeLimit';
import isLongerThanIntegralTimeLimit from './isLongerThanIntegralTimeLimit';

import {
  Container,
  Div,
  Header,
  Content,
  Appointments,
  Dates,
  CreateAppointment,
  CreateClient,
  Filter,
  Schedule,
  Calendar,
} from './styles';

interface SignUpFormData {
  name: string;
}

interface AppointmentsProvider {
  provider: {
    id: string;
    name: string;
  };
  appointments: Appointments;
}

interface Appointments {
  integral?: Appointment;
  part_time_morning?: Appointment;
  part_time_afternoon?: Appointment;
}

interface Appointment {
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

const ListAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentsProvider[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState(getDate(new Date()));
  const [monthSelected, setMonthSelected] = useState(getMonth(new Date()));
  const [yearSelected, setYearSelected] = useState(getYear(new Date()));

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  useEffect(() => {
    api
      .get('/appointments', {
        params: {
          day: daySelected,
          month: monthSelected + 1,
          year: yearSelected,
        },
      })
      .then(({ data }) => {
        setAppointments(data);
      });
  }, [daySelected, monthSelected, yearSelected]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
      setDaySelected(getDate(day));
      setMonthSelected(getMonth(day));
      setYearSelected(getYear(day));
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderHorizontal />
      </Header>

      <Div>
        <Dates>
          <h1>Agenda</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
        </Dates>

        <CreateAppointment>
          <Link to="/create-appointments">
            <FiPlus />
            Criar Agendamento
          </Link>
        </CreateAppointment>

        <CreateClient>
          <Link to="/create-clients">
            <FiUser />
            Cadastrar Cliente
          </Link>
        </CreateClient>
      </Div>

      <Content>
        <Appointments>
          <Schedule>
            <thead>
              <tr>
                <th />
                <th>
                  <span>Manhã</span>
                </th>
                <th>
                  <span>Tarde</span>
                </th>
                <th>
                  <span>Integral</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                map(appointments, (appointmentsProvider) => (
                  <tr key={appointmentsProvider.provider.id}>
                    <th>{appointmentsProvider.provider.name}</th>
                    <td>
                      <AppointmentComponent
                        appointment={
                          appointmentsProvider.appointments.part_time_morning
                        }
                        isUnavailability={
                          has(appointmentsProvider.appointments, 'integral') ||
                          isLongerThanMorningTimeLimit({
                            daySelected: new Date(
                              yearSelected,
                              monthSelected,
                              daySelected,
                            ),
                            appointments: appointmentsProvider.appointments,
                          })
                        }
                        setAppointments={setAppointments}
                      />
                    </td>

                    <td>
                      <AppointmentComponent
                        appointment={
                          appointmentsProvider.appointments.part_time_afternoon
                        }
                        isUnavailability={
                          has(appointmentsProvider.appointments, 'integral') ||
                          isLongerThanAfternoonTimeLimit(
                            appointmentsProvider.appointments,
                          )
                        }
                        setAppointments={setAppointments}
                      />
                    </td>
                    <td>
                      <AppointmentComponent
                        appointment={appointmentsProvider.appointments.integral}
                        isUnavailability={
                          has(
                            appointmentsProvider.appointments,
                            'part_time_morning',
                          ) ||
                          has(
                            appointmentsProvider.appointments,
                            'part_time_afternoon',
                          ) ||
                          isLongerThanIntegralTimeLimit({
                            daySelected: new Date(
                              yearSelected,
                              monthSelected,
                              daySelected,
                            ),
                            appointments: appointmentsProvider.appointments,
                          })
                        }
                        setAppointments={setAppointments}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th className="empty" colSpan="4">
                    Não tem agendamento hoje.
                  </th>
                </tr>
              )}
            </tbody>
          </Schedule>
        </Appointments>

        <Filter>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={{ before: new Date() }}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Filter>
      </Content>
    </Container>
  );
};
export default ListAppointments;
