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

  p + p {
    font-size: 16px;
    margin-top: 10px;
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
    color: #c53030;
  }
`;
