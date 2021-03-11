import React, { useRef, useState } from 'react';

import { FiXCircle } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import HeaderVertical from '../../components/HeaderVertical';

import useGetClients from './useGetClients';

import {
  Container,
  Content,
  Div,
  Schedule,
  Search,
  CLientsList,
  Client,
  StyledModal,
} from './styles';
import Input from '../../components/Input';

interface Address {
  uf: string;
  city: string;
  zip_code: string;
  neighborhood: string;
  number: string;
  address: string;
  complement: string;
  reference_points: string;
  nearest_subway_station: string;
  localization: string;
}

interface Data {
  id: string;
  user: {
    user_profile: {
      fullname: string;
      rg: string;
      cpf: string;
      cnpj: string;
      tel: string;
      cel: string;
      birth_date: Date;
    };
    addresses: Address[];
  };
}

const ListClients: React.FC = (Data) => {
  const formRef = useRef<FormHandles>(null);

  const [clients, setClients] = useState<Data[]>([]);
  const [editClient, setEditClient] = useState<Data>();
  const [autoCompleteValue, setAutoCompleteValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useGetClients({
    setClients,
    autoCompleteValue,
  });

  function toggleModal(client?: Data): void {
    setIsOpen(!isOpen);
    if (client) {
      setEditClient(client);
    }
  }

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Div>
          <Schedule>
            <h1>Clientes</h1>
          </Schedule>

          <Search>
            <input
              onChange={(event) => setAutoCompleteValue(event.target.value)}
              value={autoCompleteValue}
              placeholder="Digite nome/sobrenome"
            />
          </Search>

          <CLientsList>
            {clients.map((client) => {
              return (
                <Client onClick={() => toggleModal(client)}>
                  <h1>{client.user.user_profile.fullname}</h1>
                </Client>
              );
            })}
          </CLientsList>

          <StyledModal
            isOpen={isOpen}
            onBackgroundClick={() => toggleModal()}
            onEscapeKeydown={() => toggleModal()}
          >
            <div className="modal">
              <Form initialData={editClient} onSubmit={() => {}}>
                <div className="dados">
                  <div className="h1">
                    <h1>{editClient?.user.user_profile.fullname}</h1>
                    <FiXCircle onClick={() => toggleModal()} />
                  </div>

                  <p className="address">
                    <Input name="user.addresses[0].address" />
                    <Input
                      name="user.addresses[0].complement"
                      placeholder="Complemento"
                    />
                    <Input name="user.addresses[0].number" />
                  </p>
                  <p className="contact">
                    <Input name="user.user_profile.cel" />
                    <Input name="user.user_profile.tel" />
                  </p>
                </div>

                <div className="textarea-block">
                  <textarea />
                </div>
                <div className="container-buttons">
                  <button
                    type="button"
                    onClick={() => toggleModal()}
                    className="save"
                  >
                    Salvar
                  </button>

                  <div>
                    <button
                      type="button"
                      onClick={() => toggleModal()}
                      className="delete"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </StyledModal>
        </Div>
      </Content>
    </Container>
  );
};

export default ListClients;
