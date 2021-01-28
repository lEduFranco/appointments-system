import styled, { keyframes } from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  animation: ${appearFromRight} 1s;

  img {
    width: 50%;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 20px;
    }
    h3 {
      display: flex;
      align-items: flex-end;
      color: #c0c0c0;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    h5 {
      display: flex;
      color: #c0c0c0;
      padding-top: 4px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 15px;
      margin-bottom: 25px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #b28d9f;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: #3f1229;
    }
  }
`;

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
    background: ${lighten(0.05, '#3f1229')};
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
    background: ${shade(0.2, '#b28d9f')};
  }
`;
