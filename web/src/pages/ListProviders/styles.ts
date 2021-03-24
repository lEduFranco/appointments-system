import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import Modal from 'styled-react-modal';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  padding-right: 4%;
  align-items: center;
  justify-content: space-evenly;

  width: 83%;
`;

export const Div = styled.div`
  width: 80%;
  margin: 3% auto 0 auto;
`;

export const Schedule = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-bottom: 2.5%;

  h1 {
    font-size: 36px;
  }
`;

export const Search = styled.div`
  width: 100%;
  margin-top: 2%;
  margin-bottom: 2%;

  input {
    padding: 16px;
    margin-left: 2%;
    width: 98%;
    text-transform: capitalize;

    border-radius: 15px;
    background: #e8e8ea;
    border: 2px solid #b28d9f;
    color: #3f1229;

    &::placeholder {
      color: #3f1229;
    }
  }
`;

export const ProvidersList = styled.div`
  display: column;
  align-items: center;
  overflow: auto;
  height: 80vh;

  div + div {
    margin-top: 1.5%;
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
`;

export const Provider = styled.div`
  flex: 1;
  display: flex;
  background-color: #e8e8ea;
  align-items: center;
  padding: 1% 2%;
  border-radius: 15px;
  margin-left: 2%;

  &:hover {
    color: ${shade(0.2, '#b28d9f')};
  }

  h1 {
    font-size: 22px;
  }

  h2 {
    font-size: 22px;
    margin-left: 0.6%;
  }
`;

const appearFromStart = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }

`;

export const StyledModal = Modal.styled`
  width: 100rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px;
  margin: 0 auto;

  animation: ${appearFromStart} 0.8s;

  h1 {
    width: 98%;
    color: #3172b7;
    font-size: 20px;
    text-transform: capitalize;

  }

  .h1 {
    display: flex;
    justify-items: space-beetwen;

    svg {
      color: #3172b7;
      font-size: 30px;
      cursor: pointer;
    }
  }

  h5 {
    color: #3172b7;
    font-size: 16px;
  }

    p + p + p {
      font-size: 16px;
      margin-top: 10px;
      font-weight: bold;
  }

  .modal {
    width: 98%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .data {
    display: flex;
  }

  .div-personal {
    width: 20%;

  }
  .contact {
      color: #3172b7;
      margin-top: 5px;
      width: 100%;

      h6 {
        color: #3172b7;
        font-size: 12px;
        margin-top: 0.5%;
      }
  }

  .id {
    visibility: hidden;
  }

  .div-address {
    width: 40%;
    max-height: 22rem;
    padding-left: 1%;

    h5 {
      padding-bottom: 0.9%;
    }
  }

  .address {
      display: flex;
      color: #3172b7;
      width: 100%;
      margin: 0 auto;
  }

  .div-address-1 {
     width: 100%;
     padding-right: 1%;
  }

  .div-address-2 {
    width: 100%;
 }

 .div-company {
  width: 40%;
  padding-left: 1%;
  h5 {
    padding-bottom: 1%;
  }
 }

 .company {
  width: 100%;
  display: flex;
  margin: 0 auto;

  h6 {
    color: #3172b7;
    font-size: 12px;
    margin-top: 0.5%;
  }
 }

 .div-company-1{
  width: 100%;
  margin-right: 1%;
}

 .div-company-2 {
  width: 100%;
}

.select-status {
  color: #3172b7;
  margin-top: -2%;
  margin-bottom: 1%;

  h2 {
    margin-bottom: 0.5%;
  }
}

  .textarea-block {
    position: relative;
    color: #3172b7;
    font-size: 18px;
    font-weight: 700;
  }

  .textarea-block + .textarea-block {
    margin-top: 1.4rem;
  }


  .textarea-block textarea {
    width: 100%;
    height: 8rem;
    min-height: 10rem;
    max-height: 10rem;
    margin-top: 0.8rem;
    border-radius: 15px;
    background: #F8F8FC;
    border: 1px solid #3172b7;
    outline: 0;
    resize: vertical;
    padding: 1.2rem 1.6rem;
    font: 1rem Montserrat;

  }

  .textarea-block:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: #3172b7;
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 7px;
  }

  .container-buttons {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 2%;
  }

  .cancel {
    width: 5rem;
    height: 3rem;
    background: #fddede;
    color: #c53030;
    border: 0;
    border-radius: 15px;
  }

  .save {
    width: 5rem;
    height: 3rem;
    background: #d6f9fa;
    color: #2e656a;
    border: 0;
    border-radius: 15px;

  }
`;
