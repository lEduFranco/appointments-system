import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  width: 83%;
`;

export const Title = styled.div`
  padding-left: 5%;
  margin-top: 4%;
  font-size: 18px;
`;

export const Report = styled.div`
  background-color: #e8e8ea;
  width: 80%;
  height: 80%;
  border-radius: 15px;
  margin-left: 10%;
  margin-top: 2%;
`;

export const Search = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 5%;
  padding-top: 1%;
`;

export const Select = styled.div`
  width: 25%;

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.4rem;
    padding-bottom: 0.5rem;
  }
`;

export const DateSearch = styled.div`
  width: 30%;

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.4rem;
    padding-bottom: 0.5rem;
  }
`;

export const ReportsData = styled.div``;

const appearFromStart = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DivClients = styled.button`
  background: #b28d9f;
  display: flex;
  padding: 1% 2%;
  margin-top: 2%;
  margin-left: 10%;
  width: 80%;
  height: 5vh;
  border-radius: 10px;
  border: 0;

  animation: ${appearFromStart} 0.5s;
`;

export const Client = styled.div`
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 700;
  color: #f5f5f5;
`;

export const DivAppointments = styled.div`
  background: #f5f5f5;
  border-radius: 5px;
  width: 80%;
  margin: 0.5% auto;
`;

export const AppoitmentDiv = styled.div`
  background: #f5f5f5;
  color: #3172b7;
  width: 80%;
  margin: 0.5% auto;
`;

export const Providers = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const DivButton = styled.div`
  width: 15%;
`;

export const ButtonSearch = styled.button`
  background: #b28d9f;
  height: 40px;
  border-radius: 10px;
  border: 0;
  color: #f5f5f5;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.1, '#b28d9f')};
  }
`;
