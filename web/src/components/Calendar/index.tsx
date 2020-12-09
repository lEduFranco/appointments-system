import React, { useCallback, useState } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { Calendar } from './styles';

const CalendarComponent: React.FC = () => {
  return (
    <Calendar>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        fromMonth={new Date()}
        disabledDays={{ before: new Date() }}
        modifiers={{
          available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
        }}
        selectedDays={}
        onDayClick={}
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
  );
};
export default CalendarComponent;
