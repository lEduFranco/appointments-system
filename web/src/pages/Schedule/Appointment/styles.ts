import styled, { keyframes } from 'styled-components';
import Modal from 'styled-react-modal';

export const Container = styled.div`
  color: #3172b7;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 20px;
    text-transform: capitalize;

    max-width: 20.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h3 {
    font-size: 15px;
    text-transform: capitalize;
  }

  p.address {
    display: flex;
    flex-direction: row;
  }

  p {
    font-size: 16px;
    margin-top: 5px;
  }

  p + p + p {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
  }

  button {
    color: #3172b7;
    border: 0;
    background: #e8e8ea;
    svg {
      font-size: 24px;
    }
  }
`;

export const AppointmentAvailability = styled.div`
  h1 {
    font-size: 18px;
    color: #2e653a;
  }
`;

export const AppointmentUnavailable = styled.div`
  h1 {
    font-size: 18px;
    color: #8f8f8f;
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
  width: 30rem;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px;

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

  .dados {
    color: #3172b7;
    text-transform: capitalize;
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

export const StyleModalDelete = Modal.styled`
  width: 29rem;
  height: 24rem;
  display: colunm;
  align-items: center;
  justify-content: space-beetwen;
  background-color: white;
  border-radius: 15px;

  animation: ${appearFromStart} 0.8s;


  .div-h1{
    font-size: 20px
  }

  h1 {
    align-items: center;
    text-align: center;

    svg {
      color: #c53030;
      padding-top: 15px;
    }
  }

  .div-delete {
    height: 14rem;
    padding: 2% 4%;
    display: collunm;
    font-size: 22px;


    input {

      cursor: pointer;
      width: 25px;

    }

    .input-future {
      display: flex;
      align-items: center;

      h5 {
        padding-left: 1.5%;
      }
    }
  }

  .container-buttons {
    height: 5rem;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .close {
    width: 5rem;
    height: 3rem;
    background: #fddede;
    color: #c53030;
    border: 0;
    border-radius: 15px;
  }

  .confirmed {
    width: 7rem;
    height: 3rem;
    background: #d6f9fa;
    color: #2e656a;
    border: 0;
    border-radius: 15px;
  }

`;

export const StyleModalConfirmedDelete = Modal.styled`
  width: 28rem;
  height: 18rem;
  display: colunm;
  align-items: center;
  justify-content: space-beetwen;
  background-color: white;
  border-radius: 15px;

  animation: ${appearFromStart} 0.8s;


  .text-confirmed {
    height: 14rem;
    padding: 2% 4%;
    display: collunm;
    font-size: 18px;

    input {

      cursor: pointer;
      width: 25px;
    }

    h1 {
      align-items: center;
      text-align: center;

      svg {
        color: #c53030;
        padding-top: 15px;
      }
    }
  }

  .container-buttons {
    height: 3rem;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .close {
    width: 5rem;
    height: 3rem;
    background: #fddede;
    color: #c53030;
    border: 0;
    border-radius: 15px;
  }

  .confirmed {
    width: 7rem;
    height: 3rem;
    background: #d6f9fa;
    color: #2e656a;
    border: 0;
    border-radius: 15px;
  }

`;
