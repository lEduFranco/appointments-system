import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 2% auto;
  display: block;
`;

export const Schedule = styled.div`
  min-width: 1120px;
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-bottom: 2.5%;

  h1 {
    font-size: 36px;
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
  padding: 1.5% 2%;
  border-radius: 15px;
  margin-left: 24px;

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
