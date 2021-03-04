import styled from 'styled-components';
import { shade } from 'polished';

export const Calendar = styled.aside`
  width: 25%;

  .DayPicker {
    background: #3f1229;
    border-radius: 15px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
    color: #b28d9f;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #b28d9f;
    border-radius: 15px;
    color: #f5f5f5;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#f29fc9')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #b28d9f !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #f29fc9 !important;
    border-radius: 15px;
    color: #3f1229 !important;
  }
`;
