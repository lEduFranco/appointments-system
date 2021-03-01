import React, { useState } from 'react';

import { FiCalendar } from 'react-icons/fi';
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
  Date,
} from './styles';

const Reports: React.FC = () => {
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Title>
          <h1>Relatórios</h1>
        </Title>
        <Report>
          <Search>
            <Select>
              <SelectReport
                name="period"
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

            <Date>
              <h2>Datas</h2>
              <InputDatePickerReport
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                icon={FiCalendar}
              />
            </Date>
          </Search>
        </Report>
      </Content>
    </Container>
  );
};

export default Reports;
