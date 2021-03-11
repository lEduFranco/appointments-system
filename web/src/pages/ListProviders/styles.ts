import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  padding-right: 4%;
  align-items: center;
  justify-content: space-evenly;

  width: 83%;
`;

export const Div = styled.div`
  width: 80%;
  margin: 3% auto 0 auto;
`;

export const Schedule = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-bottom: 2.5%;

  h1 {
    font-size: 36px;
  }
`;

export const Search = styled.div`
  width: 100%;
  margin-top: 2%;
  margin-bottom: 2%;

  input {
    padding: 16px;
    margin-left: 2%;
    width: 98%;
    text-transform: capitalize;

    border-radius: 15px;
    background: #e8e8ea;
    border: 2px solid #b28d9f;
    color: #3f1229;

    &::placeholder {
      color: #3f1229;
    }
  }
`;

export const ProvidersList = styled.div`
  display: column;
  align-items: center;
  overflow: auto;
  height: 80vh;

  div + div {
    margin-top: 1.5%;
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
`;

export const Provider = styled.div`
  flex: 1;
  display: flex;
  background-color: #e8e8ea;
  align-items: center;
  padding: 1% 2%;
  border-radius: 15px;
  margin-left: 2%;

  &:hover {
    color: ${shade(0.2, '#b28d9f')};
  }

  h1 {
    font-size: 22px;
  }

  h2 {
    font-size: 22px;
    margin-left: 0.6%;
  }
`;
