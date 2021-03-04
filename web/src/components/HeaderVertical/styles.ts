import styled, { keyframes } from 'styled-components';

export const Header = styled.header`
  background-color: #e8e8ea;
  width: 17%;
  height: 100vh;

  /* position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  transition: 0.5s;
  overflow-x: hidden;
  white-space: nowrap; */
`;

export const HeaderTop = styled.div`
  width: 100%;
  height: 9%;
  display: flex;
  align-items: center;
  background: #b28d9f;
  justify-content: space-between;

  > img {
    height: 75%;
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

const appearFromStart = keyframes`
  from {
    transform: translateX(5px);
  }
  to {
    transform: translateX(5px);
  }
`;

export const HeaderRoutesStyle = styled.div`
  a {
    color: #b28d9f;
    margin-top: 6%;
    margin-left: 5%;
    margin-right: 5%;
    text-decoration: none;
    transition: color 0.2s;
    padding: 5% 0;

    font-size: 25px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 8%;
    }

    &:hover {
      color: #3f1229;
      animation: ${appearFromStart} 120s;
    }
  }
`;
