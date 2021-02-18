import styled from 'styled-components';

export const Container = styled.div`
  color: #000;
`;

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
