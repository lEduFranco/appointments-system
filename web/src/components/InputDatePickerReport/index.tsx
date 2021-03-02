import React, { useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { IconBaseProps } from 'react-icons';

import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

interface InputProps extends Omit<ReactDatePickerProps, 'onChange'> {
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  startDate: Date;
  setStartDate: Function;
  endDate: Date;
  setEndDate: Function;
}

const Input: React.FC<InputProps> = ({
  containerStyle = {},
  icon: Icon,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <Container style={containerStyle}>
      {Icon && <Icon size={20} />}
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        dateFormat="dd/MM/yyyy"
        locale={ptBR}
        startDate={startDate}
        endDate={endDate}
      />
      <ReactDatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        dateFormat="dd/MM/yyyy"
        locale={ptBR}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </Container>
  );
};
export default Input;
