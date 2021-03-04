import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #b28d9f;
  border-radius: 15px;
  padding-top: 4%;
  padding-bottom: 4%;
  padding-left: 4%;
  width: 90%;
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

    width: 75%;
  }

  svg {
    margin-right: 3%;
    width: 12%;
    height: 200%;
    font-size: 16px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #3f1227;
    `}
`;
