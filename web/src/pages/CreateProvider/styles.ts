import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 83%;
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
    margin-top: 20%;
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
      margin-top: 24px;
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
