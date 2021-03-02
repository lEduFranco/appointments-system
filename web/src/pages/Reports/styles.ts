import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  width: 100%;
`;

export const Title = styled.div`
  margin-left: 12%;
  margin-top: 3%;
`;

export const Report = styled.div`
  background-color: #e8e8ea;
  width: 70%;
  height: 85vh;
  border-radius: 15px;
  margin-left: 15%;
  margin-top: 2%;
`;

export const Search = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-top: 2%;
`;

export const Select = styled.div``;

export const DateSearch = styled.div`
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.4rem;
    padding-bottom: 0.6rem;
  }
`;

export const ReportsData = styled.div``;

export const Appointments = styled.div``;

export const ButtonSearch = styled.button`
  background: #b28d9f;
  height: 40px;
  border-radius: 10px;
  border: 0;
  color: #f5f5f5;
  width: 25%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.1, '#b28d9f')};
  }
`;
