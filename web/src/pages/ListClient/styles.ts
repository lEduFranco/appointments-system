import styled from 'styled-components';
import { shade } from 'polished';

export const Body = styled.div`
  background-color: red;
`;

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #b28d9f;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #3f1227;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f5f5f5;
    }

    a {
      text-decoration: none;
      color: #3f1227;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: block;
`;

export const Schedule = styled.div`
  min-width: 1120px;
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-bottom: 50px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #3f1227;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #b28d9f;
      margin: 0 8px;
    }
  }

  > a {
    color: #b28d9f;

    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      /* color: ${shade(0.5, '#b28d9f')}; */
      color: #3f1227
    }
  }
`;

export const ProvidersList = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
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

  div {
    flex: 1;
    background: #b28d9f;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    &:hover {
      color: ${shade(0.2, '#b28d9f')};
    }

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #f5f5f5;
      font-size: 20px;
    }
  }
`;
export const ProvidersList01 = styled.div`
  a {
    text-decoration: none;
  }
`;
