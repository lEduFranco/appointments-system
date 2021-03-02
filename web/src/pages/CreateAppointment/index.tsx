/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useState, FormEvent, useMemo } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';

import { format, getDate, getMonth, getYear, isToday } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { useToast } from '../../hooks/toast';
import 'react-day-picker/lib/style.css';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Select from '../../components/Select';

import useGetProviders from './useGetProviders';
import useGetClients from './useGetClients';
import HeaderVertical from '../../components/HeaderVertical';

import api from '../../services/api';

import {
  Container,
  Content,
  AutoCompleteStyle,
  AnimationContainer,
  DivSearch,
  DivSelect,
  Dates,
  Calendar,
} from './styles';

interface Client {
  id: string;
  user: {
    user_profile: {
      firstname: string;
      lastname: string;
    };
  };
}

const CreateAppointments: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [period, setPeriod] = useState('');
  const [frequency, setFrequency] = useState('');
  const [provider, setProvider] = useState('');
  const [providers, setProviders] = useState([]);
  const [client, setClient] = useState<Client>('');
  const [autoCompleteValue, setAutoCompleteValue] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState(getDate(new Date()));
  const [monthSelected, setMonthSelected] = useState(getMonth(new Date()));
  const [yearSelected, setYearSelected] = useState(getYear(new Date()));

  useGetProviders({
    day: daySelected,
    month: monthSelected + 1,
    year: yearSelected,
    period,
    frequency,
    setProviders,
  });

  useGetClients({
    setClients,
    autoCompleteValue,
  });

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  async function handleSubmit(e: FormEvent): Promise<void> {
    try {
      e.preventDefault();

      const data = {
        client_id: client.id,
        provider_id: provider,
        frequency,
        period,
        day: daySelected,
        month: monthSelected + 1,
        year: yearSelected,
      };

      const schema = Yup.object().shape({
        client_id: Yup.string().required('Selecione o cliente, por favor!'),
        period: Yup.string().required('Selecione o período, por favor!'),
        frequency: Yup.string().required('Selecione a frequência, por favor!'),
        provider_id: Yup.string().required('Selecione a diarista, por favor!'),
        day: Yup.number().required('Selecione a data, por favor!'),
        month: Yup.number().required('Selecione a data, por favor!'),
        year: Yup.number().required('Selecione a data, por favor!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api
        .post('/appointments', {
          client_id: client.id,
          period,
          frequency,
          provider_id: provider,
          day: daySelected,
          month: monthSelected + 1,
          year: yearSelected,
        })
        .then(() => {
          history.push('/list-appointments');

          addToast({
            type: 'success',
            title: 'Agendamento',
            description: 'Seu agendamento foi cadastrado com sucesso!',
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
      <HeaderVertical />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Criar agendamento</h1>

            <DivSearch>
              <h3>Cliente</h3>
              <Autocomplete
                shouldItemRender={(item, value) =>
                  `${item.user.user_profile.firstname} ${item.user.user_profile.lastname}`
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1
                }
                getItemValue={(item) =>
                  `${item.user.user_profile.firstname} ${item.user.user_profile.lastname}`
                }
                items={clients}
                value={autoCompleteValue}
                onSelect={(value, item) => {
                  setAutoCompleteValue(value);

                  setClient(item);
                }}
                onChange={(event, value) => {
                  setAutoCompleteValue(event.target.value);
                }}
                renderMenu={(children) => (
                  <div className="menu">{children}</div>
                )}
                renderItem={(item, isHighlighted) => (
                  <AutoCompleteStyle
                    className={`item ${
                      isHighlighted ? 'item-highlighted' : ''
                    }`}
                    key={item.id}
                  >
                    {item.user.user_profile.firstname}{' '}
                    {item.user.user_profile.lastname}
                  </AutoCompleteStyle>
                )}
              />
            </DivSearch>

            <DivSelect>
              <Select
                name="period"
                label="Tipo de diária"
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
                label="Frequência do serviço"
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
              <Select
                name="providers"
                label="Diaristas"
                value={provider}
                onChange={(e) => {
                  setProvider(e.target.value);
                }}
                options={providers}
              />
            </DivSelect>

            <Button type="submit">Cadastrar</Button>
          </form>
        </AnimationContainer>

        <Dates>
          <h1>Data</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
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
        </Dates>
      </Content>
    </Container>
  );
};

export default CreateAppointments;
