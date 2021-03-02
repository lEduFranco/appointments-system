import React, { useState, FormEvent } from 'react';

import * as Yup from 'yup';
import Collapse from '@kunukn/react-collapse';
import { FiCalendar } from 'react-icons/fi';
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
  DivAppointments,
  AppoitmentDiv,
  Providers,
  DivButton,
  ButtonSearch,
} from './styles';

export interface AppointmentsClient {
  client: {
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
        cpf: string;
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
  const [collapseClientId, setCollapseClientId] = useState('');

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
          description: 'Ocorreu um erro ao buscar relatórios, tente novamente!',
        });

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro!',
        description: 'Ocorreu um erro ao buscar relatórios, tente novamente!',
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
                <>
                  <DivClients
                    type="button"
                    onClick={() => setCollapseClientId(appointment.client.id)}
                  >
                    <Client>{appointment.client.name}</Client>
                  </DivClients>
                  <Collapse isOpen={appointment.client.id === collapseClientId}>
                    <DivAppointments>
                      {appointment.appointments.map((appointmentClient) => (
                        <>
                          <Providers>
                            {`${appointmentClient.provider.user.user_profile.firstname}
                              ${appointmentClient.provider.user.user_profile.lastname}`}
                          </Providers>
                          <AppoitmentDiv>
                            {` ${appointmentClient.date} ${getFrequencyName(
                              appointmentClient.frequency,
                            )} ${appointmentClient.period} `}
                          </AppoitmentDiv>
                        </>
                      ))}
                    </DivAppointments>
                  </Collapse>
                </>
              ))}
            </ReportsData>
          </form>
        </Report>
      </Content>
    </Container>
  );
};

export default Reports;
