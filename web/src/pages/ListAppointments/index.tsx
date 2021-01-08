import React, { useState, useEffect, useCallback, useMemo } from 'react';
import map from 'lodash/map';
import has from 'lodash/has';

import { format, isToday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';

import { getDate, getMonth, getYear } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiFilter, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import Select from '../../components/Select';
import Button from '../../components/Button';
import HeaderComponent from '../../components/Header';

import AppointmentComponent from './Appointment';

import isLongerThanMorningTimeLimit from './isLongerThanMorningTimeLimit';
import isLongerThanAfternoonTimeLimit from './isLongerThanAfternoonTimeLimit';
import isLongerThanIntegralTimeLimit from './isLongerThanIntegralTimeLimit';

import {
  Container,
  Div,
  Content,
  Appointments,
  Dates,
  CreateAppointment,
  CreateClient,
  Filter,
  Schedule,
  AnimationContainer,
  Calendar,
  BorderlessButton,
} from './styles';

interface SignUpFormData {
  name: string;
}

interface AppointmentsProvider {
  provider: string;
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

const ListAppointments: React.FC = () => {
  const [period, setPeriod] = useState('');
  const [appointments, setAppointments] = useState<AppointmentsProvider[]>([]);
  const [frequency, setFrequency] = useState('');
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
      <HeaderComponent />

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
            Criar agendamento
          </Link>
        </CreateAppointment>

        <CreateClient>
          <Link to="/create-clients">
            <FiPlus />
            Cadastrar cliente
          </Link>
        </CreateClient>
      </Div>

      <Content>
        <Appointments>
          <Schedule>
            <div className="scroll">
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
                    <tr key={appointmentsProvider.provider}>
                      <th>{appointmentsProvider.provider}</th>
                      <td>
                        <AppointmentComponent
                          appointment={
                            appointmentsProvider.appointments.part_time_morning
                          }
                          isUnavailability={
                            has(
                              appointmentsProvider.appointments,
                              'integral',
                            ) ||
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
                            appointmentsProvider.appointments
                              .part_time_afternoon
                          }
                          isUnavailability={
                            has(
                              appointmentsProvider.appointments,
                              'integral',
                            ) ||
                            isLongerThanAfternoonTimeLimit(
                              appointmentsProvider.appointments,
                            )
                          }
                          setAppointments={setAppointments}
                        />
                      </td>
                      <td>
                        <AppointmentComponent
                          appointment={
                            appointmentsProvider.appointments.integral
                          }
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
            </div>
          </Schedule>
        </Appointments>

        <Filter>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={{ before: new Date() }}
              // disabledDays={[{ daysOfWeek: [0] }]}
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

          {/* <AnimationContainer>
            <Form onSubmit={() => {}}>
              <BorderlessButton>
                <h1>Filtro</h1>
                <FiFilter size={25} />
              </BorderlessButton>


              <Select
                name="period"
                label=""
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                }}
                options={[
                  {
                    value: 'part_time_morning',
                    label: 'Manhã - 4h (meio periodo)',
                  },
                  {
                    value: 'part_time_afternoon',
                    label: 'Tarde - 4h (meio periodo)',
                  },
                  { value: 'integral', label: 'Integral - 8h' },
                ]}
              />

              <Select
                name="frequency"
                label=""
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                }}
                options={[
                  { value: 'first_contact', label: 'Primeira diária' },
                  { value: 'monthly', label: 'Avulso' },
                  { value: 'weekly', label: 'Semanal' },
                  { value: 'biweekly', label: 'Quinzenal' },
                ]}
              />
              <Button type="submit">buscar</Button>

            </Form>
          </AnimationContainer> */}
        </Filter>
      </Content>
    </Container>
  );
};
export default ListAppointments;
