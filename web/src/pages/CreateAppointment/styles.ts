import styled, { keyframes } from 'styled-components';
import { lighten, shade } from 'polished';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  margin-bottom: 5%;
  padding-right: 4%;
  align-items: center;
  justify-content: space-evenly;

  width: 83%;
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
  width: 30%;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromStart} 1s;

  form {
    min-width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 6%;
    }

    button {
      margin-top: 8%;
    }
  }
`;

export const DivSearch = styled.div`
  position: relative;
  width: 100%;
  height: 6.8rem;
  z-index: 2;

  h3 {
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: 2%;
  }

  input {
    width: 25vw;
    height: 3.8rem;

    background: #e8e8ea;
    border-radius: 15px;
    border: 1px solid #b28d9f;

    padding: 0 2%;

    text-transform: uppercase;
  }

  .menu {
    background: #e8e8ea;
    border-radius: 15px;
  }

  .item-highlighted {
    color: #3f1229;
    background-color: #b28d9f;
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

  border-radius: 15px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  padding: 2% 2%;
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

  padding-bottom: 13%;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 2%;
    margin-bottom: 2%;
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
