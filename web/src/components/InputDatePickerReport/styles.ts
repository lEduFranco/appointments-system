import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: #b28d9f;
  border-radius: 0.8rem;
  padding: 16px;
  width: 100%;
  height: 3.1rem;
  margin-top: 1%;

  border: 2px solid #b28d9f;
  color: #f5f5f5;

  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #3f1227;

    &::placeholder {
      color: #f5f5f5;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f5f5f5;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
