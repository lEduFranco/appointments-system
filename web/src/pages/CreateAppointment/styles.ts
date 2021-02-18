import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  margin-top: -10%;
  align-items: center;
  justify-content: space-evenly;

  width: 80%;
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
    min-width: 100%;
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

    button {
      margin-top: 10%;
    }
  }

  > a {
    color: #b28d9f;
    display: block;
    margin-top: 15%;
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

export const DivSearch = styled.div`
  padding-bottom: 10%;
  position: relative;
  width: 100%;
  height: 100px;
  z-index: 2;

  h3 {
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: 10px;
  }

  input {
    width: 550px;
    height: 3.8rem;

    background: #b28d9f;
    border-radius: 12.8px;
    border: 1px solid #3f1229;

    padding: 0 10px;

    text-transform: uppercase;
  }

  .menu {
    background: #b28d9f;
    border-radius: 10px;
  }

  .item-highlighted {
    color: #b28d9f;
    background-color: #3f1229;
  }
`;

export const DivSelect = styled.div`
  display: block;
  justify-content: center;
  padding-top: 5%;
  position: relative;
  z-index: 1;
`;

export const AutoCompleteStyle = styled.div`
  display: flex;

  border-radius: 10px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  padding: 8px 4px;
  font-size: 1rem;
  position: relative;
  overflow: auto;
  max-height: 50%;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Dates = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 9%;
  padding-left: 2%;
  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    margin-bottom: 8px;
    color: #3f1227;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 20px;
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

export const Calendar = styled.aside`
  width: 150%;

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
