/* eslint-disable react/jsx-curly-newline */
import React, { useState, FormEvent } from 'react';

import * as Yup from 'yup';
import Collapse from '@kunukn/react-collapse';
import { FiCalendar } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import SelectReport from '../../components/SelectReport';
import InputDatePickerReport from '../../components/InputDatePickerReport';
import HeaderVertical from '../../components/HeaderVertical';

import {
  Container,
  Content,
  Title,
  Report,
  Search,
  Select,
  DateSearch,
  ReportsData,
  DivClients,
  Client,
  Name,
  Cpf,
  TotalClients,
  DivProviders,
  Providers,
  Provider,
  TotalProviders,
  DivAppointments,
  AppoitmentDiv,
  DivDate,
  Frequency,
  Period,
  DivButton,
  ButtonSearch,
} from './styles';

export interface AppointmentsClient {
  client: {
    id: string;
    name: string;
    cpf: string;
  };

  appointmentsProvider: AppointmentsProvider[];
}

interface AppointmentsProvider {
  provider: {
    id: string;
    name: string;
  };

  appointments: Appointment[];
}

interface Appointment {
  id: string;
  period: string;
  frequency: string;
  date: string;
  client: {
    user: {
      user_profile: {
        firstname: string;
        lastname: string;
      };
    };
  };
  provider: {
    user: {
      user_profile: {
        firstname: string;
        lastname: string;
      };
    };
  };
}

const Reports: React.FC = () => {
  const { addToast } = useToast();

  const [appointments, setAppointments] = useState<AppointmentsClient[]>([]);
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [collapseClientId, setCollapseClientId] = useState<string[]>([]);

  function getFrequencyName(frequencyParam?: string): string {
    if (frequencyParam === 'weekly') {
      return 'Semanal';
    }

    if (frequencyParam === 'biweekly') {
      return 'Quinzenal';
    }

    if (frequencyParam === 'monthly') {
      return 'Avulso';
    }

    return 'Primeira Diária';
  }

  function getPeriodName(period?: string): string {
    if (period === 'integral') {
      return 'Integral';
    }

    if (period === 'part_time_morning') {
      return 'Meio periodo manhã';
    }

    return 'Meio periodo tarde';
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    try {
      e.preventDefault();

      const data = {
        frequency,
        startDate,
        endDate,
      };

      const schema = Yup.object().shape({
        frequency: Yup.string().required('Selecione a frequência, por favor!'),
        startDate: Yup.date().required('Selecione a data, por favor!'),
        endDate: Yup.date().required('Selecione a data, por favor!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api
        .get('/appointments/reports', {
          params: {
            frequency,
            startDate,
            endDate,
          },
        })
        .then((response) => {
          setAppointments(response.data);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'O relatório foi buscado com sucesso!',
          });
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        // formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro nos Dados!',
          description:
            'Ocorreu um erro ao buscar relatórios, verifique os campos!',
        });

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro!',
        description:
          'Ocorreu um erro ao buscar relatórios, verifique os campos!',
      });
    }
  }

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Title>
          <h1>Relatórios</h1>
        </Title>
        <Report>
          <form onSubmit={handleSubmit}>
            <Search>
              <Select>
                <h3>Tipo de diária</h3>
                <SelectReport
                  name="freaquncy"
                  value={frequency}
                  onChange={(e) => {
                    setFrequency(e.target.value);
                  }}
                  options={[
                    {
                      value: 'detached',
                      label: 'Avulsos',
                    },
                    {
                      value: 'fixed',
                      label: 'Fixos',
                    },
                  ]}
                />
              </Select>

              <DateSearch>
                <h3>Datas</h3>
                <InputDatePickerReport
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  icon={FiCalendar}
                />
              </DateSearch>
              <DivButton>
                <ButtonSearch type="submit">Pesquisar</ButtonSearch>
              </DivButton>
            </Search>

            <ReportsData>
              {appointments.map((appointment) => (
                <div key={appointment.client.id}>
                  <DivClients
                    onClick={() => {
                      if (collapseClientId.includes(appointment.client.id)) {
                        const filteredArray = collapseClientId.filter(
                          (item: string) => item !== appointment.client.id,
                        );

                        setCollapseClientId(filteredArray);

                        return;
                      }

                      setCollapseClientId((state) => {
                        return [...state, appointment.client.id];
                      });
                    }}
                  >
                    <Client>
                      <Name> {appointment.client.name} </Name>
                      <Cpf>
                        <h3>CPF:</h3> {appointment.client.cpf}
                      </Cpf>
                      <TotalClients>
                        <h4>Total:</h4>
                        {appointment.appointmentsProvider.reduce(
                          (acc, item) => {
                            return (acc += item.appointments.length);
                          },
                          0,
                        )}
                      </TotalClients>
                    </Client>
                  </DivClients>
                  <Collapse
                    isOpen={collapseClientId.includes(appointment.client.id)}
                  >
                    <DivAppointments>
                      {appointment.appointmentsProvider.map(
                        (appointmentProvider) => (
                          <DivProviders key={appointmentProvider.provider.id}>
                            <Providers>
                              <Provider>
                                {appointmentProvider.provider.name}
                              </Provider>

                              <TotalProviders>
                                <h4>Total:</h4>
                                {appointmentProvider.appointments.length}
                              </TotalProviders>
                            </Providers>

                            <AppoitmentDiv>
                              {appointmentProvider.appointments.map(
                                (appointmentsProviders) => (
                                  <div key={appointmentsProviders.id}>
                                    <DivDate>
                                      <h4>Data:</h4>
                                      {` ${format(
                                        parseISO(appointmentsProviders.date),
                                        "'Dia' dd 'de' MMMM 'de' yyyy",
                                        {
                                          locale: ptBR,
                                        },
                                      )} `}
                                    </DivDate>
                                    <Frequency>
                                      {`${getFrequencyName(
                                        appointmentsProviders.frequency,
                                      )}`}
                                    </Frequency>
                                    <Period>
                                      {`${getPeriodName(
                                        appointmentsProviders.period,
                                      )}`}
                                    </Period>
                                  </div>
                                ),
                              )}
                            </AppoitmentDiv>

                            {/* </Collapse> */}
                          </DivProviders>
                        ),
                      )}
                    </DivAppointments>
                  </Collapse>
                </div>
              ))}
            </ReportsData>
          </form>
        </Report>
      </Content>
    </Container>
  );
};

export default Reports;
