import React, { useState, FormEvent } from 'react';

import * as Yup from 'yup';
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
            title: 'Relatório',
            description: 'O Relatório foi buscado com sucesso!',
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
            'Ocorreu um erro ao fazer cadastro do agendamento, tente novamente!',
        });

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro!',
        description:
          'Ocorreu um erro ao fazer cadastro do agendamento, tente novamente!',
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
          <Search>
            <form onSubmit={handleSubmit}>
              <Select>
                <SelectReport
                  name="freaquncy"
                  label="Tipo de diária"
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
                <h2>Datas</h2>
                <InputDatePickerReport
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  icon={FiCalendar}
                />
              </DateSearch>

              <ReportsData>
                {appointments.map((appointment) => (
                  <div>
                    <div>{appointment.client.name}</div>
                    <ul>
                      {appointment.appointments.map((appointmentClient) => (
                        <li>{`${appointmentClient.provider.user.user_profile.firstname} ${appointmentClient.provider.user.user_profile.lastname}`}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ReportsData>

              <ButtonSearch type="submit">Pesquisar</ButtonSearch>
            </form>
          </Search>
        </Report>
      </Content>
    </Container>
  );
};

export default Reports;
