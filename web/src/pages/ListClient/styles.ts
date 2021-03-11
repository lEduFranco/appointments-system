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

export const CLientsList = styled.div`
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

export const Client = styled.div`
  flex: 1;
  display: flex;
  background-color: #e8e8ea;
  align-items: center;
  padding: 1% 2%;
  border-radius: 15px;
  width: 98%;
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
  width: 40rem;
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

    p {
      color: #3172b7;
      font-size: 16px;
      margin-top: 5px;


    }

    p + p + p {
      font-size: 16px;
      margin-top: 10px;
      font-weight: bold;
  }

  .modal {
    width: 28rem;
    height: 28rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }



  .textarea-block {
    position: relative;
  }

  .textarea-block + .textarea-block {
    margin-top: 1.4rem;
  }


  .textarea-block textarea {
    width: 100%;
    height: 8rem;
    min-height: 8rem;
    max-height: 16rem;
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
  }

  .delete {
    width: 5rem;
    height: 3rem;
    background: #fddede;
    color: #c53030;
    border: 0;
    border-radius: 15px;
  }

  .edit {
    width: 5rem;
    height: 3rem;

    background: #ffffbf;
    color: #d19111;
    border: 0;
    border-radius: 15px;

    a {

      color: #d19111;
      text-decoration: none;
    }
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
