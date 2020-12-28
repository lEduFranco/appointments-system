import styled from 'styled-components';

export const Container = styled.div`
  color: #3172b7;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 20px;
    text-transform: capitalize;
  }
  h3 {
    font-size: 15px;
    text-transform: capitalize;
  }

  ul:nth-child(1) {
    padding-right: 10px;
  }

  ul:nth-child(2) {
    padding-right: 10px;
  }

  ul {
    max-width: 100%;
    display: flex;
  }

  p {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
    /* margin-left: 2%; */
  }
`;

export const AppointmentAvailability = styled.div`
  h1 {
    font-size: 18px;
    color: #2e653a;
  }
`;

export const AppointmentUnavailable = styled.div`
  h1 {
    font-size: 18px;
    color: #8f8f8f;
  }
`;
