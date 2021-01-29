import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonNextStep = styled.button`
  background: #3f1229;
  height: 40px;
  border-radius: 10px;
  border: 0;
  color: #f5f5f5;
  width: 25%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${lighten(0.03, '#3f1229')};
  }
`;
export const ButtonBackStep = styled.button`
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
