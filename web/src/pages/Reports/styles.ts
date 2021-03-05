import { lighten, shade } from 'polished';
import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  width: 83%;
`;

export const Title = styled.div`
  padding-left: 5%;
  margin-top: 2%;
  font-size: 18px;
`;

export const Report = styled.div`
  background-color: #e8e8ea;
  width: 80%;
  height: 80%;
  border-radius: 15px;
  margin-left: 10%;
  margin-top: 2%;

  animation: ${appearFromStart} 0.8s;
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

export const ReportsData = styled.div`
  height: 65vh;
  margin-top: 2%;
  overflow: auto;
`;

export const DivClients = styled.div`
  background: #b28d9f;
  display: flex;
  padding: 1% 2%;
  margin-top: 2%;
  margin-left: 10%;
  width: 80%;
  height: 5vh;
  border-radius: 15px;
  border: 0;
  cursor: pointer;

  animation: ${appearFromStart} 0.5s;

  &:hover {
    background: ${shade(0.1, '#b28d9f')};
  }
`;

export const Client = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.div`
  display: flex;
  width: 50%;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 700;
  color: #f5f5f5;
  cursor: text;
`;

export const Cpf = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 700;
  color: #f5f5f5;
  cursor: text;

  h3 {
    margin-right: 2%;
  }
`;

export const DivProviders = styled.div`
  height: 100%;
`;

export const Provider = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const Providers = styled.div`
  display: flex;
  margin-top: 2%;
  margin-left: 2%;
`;

export const DivAppointments = styled.div`
  background: #ebf8ff;
  border-radius: 15px;
  width: 70%;
  margin: 0.5% auto;
  padding-top: 1%;
`;

export const AppoitmentDiv = styled.div`
  background: #ebf8ff;
  color: #3172b7;
  width: 80%;
  height: 100%;
  margin: 0.5% 5%;
`;

export const DivDate = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 2%;

  h4 {
    margin-right: 1%;
  }
`;
export const Frequency = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 2%;
`;
export const Period = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 2%;
  padding-bottom: 2%;
`;

export const DivButton = styled.div`
  width: 15%;
`;

export const ButtonSearch = styled.button`
  background: #b28d9f;
  height: 3.1rem;
  border-radius: 15px;
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
