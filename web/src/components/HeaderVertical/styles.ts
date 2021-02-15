import styled from 'styled-components';

export const Header = styled.header`
  background: #e8e8ea;
  width: 16%;
  height: 100vh;
`;

export const HeaderTop = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  background: #b28d9f;
  justify-content: space-between;

  > img {
    height: 80px;
    margin-left: 6%;
  }

  button {
    margin-right: 6%;
    background: transparent;
    border: 0;

    svg {
      color: #3f1227;
      width: 20px;
      height: 20px;
    }
  }
`;

export const HeaderRoutes = styled.div`
  a {
    color: #b28d9f;
    margin-top: 24px;
    margin-left: 5%;
    text-decoration: none;
    transition: color 0.2s;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    padding: 5% 0;

    font-size: 25px;

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
