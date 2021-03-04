import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #b28d9f;
  border-radius: 15px;
  padding: 16px;
  width: 100%;

  border: 2px solid #b28d9f;
  color: #f5f5f5;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
    ${(props) =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #3f1227;
      border-color: #3f1227;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #3f1227;
    `}


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
