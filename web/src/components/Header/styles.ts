import styled from 'styled-components';

export const Header = styled.header`
  background: #b28d9f;
  height: 5vh;
`;

export const HeaderContent = styled.div`
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 95%;
    margin-left: -1.55%;
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
