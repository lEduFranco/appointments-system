import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #b28d9f;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #3f1227;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f5f5f5;
    }

    a {
      text-decoration: none;
      color: #3f1227;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 100%;
  min-height: 100%;
  margin: 80px 40px;
`;

export const Schedule = styled.table`
  width: 100%;
  thead {
    color: #b28d9f;

    th {
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  tbody {
    td:nth-child(1) {
      font-weight: bold;
      text-transform: uppercase;
      background: #f5f5f5;
    }

    td {
      background: #d3d3d3;
      text-align: center;
      padding: 20px;
    }
  }
`;

export const NextAppointments = styled.div`
  margin-top: 64px;

  > strong {
    color: #3f1229;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #b28d9f;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      content: '';
      background: #3f1229;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #f5f5f5;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #f5f5f5;

      svg {
        color: #3f1229;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #3f1229;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3f1229;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > P {
    color: #b28d9f;
  }
`;

export const Appointments = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #3f1229;
    width: 70px;

    svg {
      color: #3f1229;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #b28d9f;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    justify-content: space-between;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      padding-right: 210px;
      color: #f5f5f5;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #3f1229;
    border-radius: 10px;
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
    border-radius: 10px;
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
    border-radius: 10px;
    color: #3f1229 !important;
  }
`;
