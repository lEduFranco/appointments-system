import styled from 'styled-components';
import { shade } from 'polished';

export const ProviderContainer = styled.div`
  display: flex;
  align-items: center;

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
    display: flex;

    background: #b28d9f;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 2.5%;
    margin-bottom: 16px;
    color: #f5f5f5;

   div > a {
      flex: 1;
      border: 0;
    }

  .edit {
    padding-top: 2px;
    margin-right: 20px;
  }

  .agenda {
    padding-top: 2px;
    margin-right: 20px;
  }

    &:hover {
      /* background: ${shade(0.2, '#3f1229')}; */
      background: #3f1229;
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
      padding-right: 20px;
    }

    p  {
      flex:1;
      margin: 0 auto;
      justify-content: space-between;

    }
  }
`;
