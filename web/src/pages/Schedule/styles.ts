import styled, { keyframes } from 'styled-components';
import { lighten, shade } from 'polished';

export const Container = styled.div`
  height: 75vh;
`;

export const Header = styled.header`
  padding: 8px 0;
  background: #b28d9f;
`;

export const Div = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Dates = styled.div`
  width: 25%;

  display: flex;
  flex-direction: column;

  padding-top: 1%;
  padding-left: 2%;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #3f1227;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 22px;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #b28d9f;
      margin: 0 8px;
    }
  }
`;
export const CreateAppointment = styled.main`
  width: 39%;
  display: flex;
  justify-content: flex-end;

  > a {
    color: #b28d9f;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 22px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: #3f1229;
    }
  }
`;

export const CreateClient = styled.main`
  width: 38%;
  display: flex;
  justify-content: flex-end;
  padding-right: 4%;

  > a {
    color: #b28d9f;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 22px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: #3f1229;
    }
  }
`;

export const Content = styled.main`
  max-width: 100%;
  min-height: 100%;

  margin: 2% 2%;

  display: flex;
  flex-direction: row;
`;

export const Appointments = styled.div`
  width: 75%;
  max-width: 75%;
  min-height: 100%;
  overflow: auto;
  height: 75vh;

  display: flex;
  flex-direction: column;
`;

export const Filter = styled.div`
  width: 25%;
  min-height: 100%;
  margin-top: 1%;

  display: flex;
  flex-direction: column;

  align-items: center;

  > a {
    color: #b28d9f;
    margin-top: 85%;
    margin-left: 38%;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 20px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: #3f1229;
    }
  }
`;

const appearFromStart = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromStart} 1s;

  form {
    margin: 80px 0;
    width: 125%;

    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #b28d9f;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: #3f1229;
    }
  }
`;

export const BorderlessButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivSchedule = styled.table`
  width: 85%;

  thead {
    color: #b28d9f;

    th {
      font-weight: bold;
      text-transform: uppercase;
      position: relative;
    }
  }

  tbody {
    th {
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
      background: #f5f5f5;
      width: 5%;
    }

    td {
      background: #e8e8ea;
      text-align: center;
      padding: 20px;
      width: 25%;

      border-radius: 15px;
    }
  }

  .empty {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    background: #e8e8ea;
    border-radius: 15px;
    height: 15vh;
  }
`;

export const Calendar = styled.aside`
  min-width: 85%;

  .DayPicker {
    background: #e8e8ea;
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
    color: #e8e8ea;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${lighten(0.1, '#3f1229')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #b28d9f !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #3f1229 !important;
    border-radius: 15px;
    color: #e8e8ea !important;
  }
`;
