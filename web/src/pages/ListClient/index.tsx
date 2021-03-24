import React, { useCallback, useRef, useState } from 'react';
import cep from 'cep-promise';
import { FiXCircle, FiCalendar } from 'react-icons/fi';

import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import HeaderVertical from '../../components/HeaderVertical';
import InputEdit from '../../components/InputEdit';
import InputDatePickerEdit from '../../components/InputDatePickerEdit';
import SelectEdit from '../../components/SelectEdit';
import TextArea from '../../components/TextArea';

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
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface Address {
  id: string;
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
  cf_df: string;
  occuppation: string;
  company_responsible: string;
  status: string;
  user: {
    id: string;
    user_profile: {
      id: string;
      fullname: string;
      rg: string;
      cpf: string;
      cnpj: string;
      tel: string;
      cel: string;
      birth_date: Date;
      observation: string;
    };
    addresses: Address[];
  };
}

interface CepPromise {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

const ListClients: React.FC = (Data) => {
  const { addToast } = useToast();
  const history = useHistory();

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
      const { user, ...restClient } = client;
      const { user_profile, ...addresses } = user;
      const { birth_date, ...restUserProfile } = user_profile;
      const birthDateString = birth_date.toString();
      const mapClient = {
        ...restClient,
        user: {
          user_profile: {
            ...restUserProfile,
            birth_date: parseISO(birthDateString),
          },
          ...addresses,
        },
      };
      setEditClient(mapClient);
    }
  }

  const searchAddress = useCallback(
    async (zipcode: string) => {
      try {
        cep(zipcode).then((data: CepPromise) => {
          formRef?.current?.setFieldValue('user.addresses[0].uf', data.state);
          formRef?.current?.setFieldValue('user.addresses[0].city', data.city);
          formRef?.current?.setFieldValue(
            'user.addresses[0].neighborhood',
            data.neighborhood,
          );
          formRef?.current?.setFieldValue(
            'user.addresses[0].address',
            data.street,
          );
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro no CEP!',
          description: 'CEP não encontrado',
        });
      }
    },
    [addToast],
  );

  const handleSubmit = useCallback(
    async (data: Data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          rg: Yup.string(),
          cpf: Yup.string(),
          tel: Yup.string(),
          cel: Yup.string(),
          birth_date: Yup.string(),
          occuppation: Yup.string(),
          zip_code: Yup.string(),
          uf: Yup.string(),
          city: Yup.string(),
          neighborhood: Yup.string(),
          number: Yup.string(),
          address: Yup.string(),
          complement: Yup.string(),
          reference_points: Yup.string(),
          nearest_subway_station: Yup.string(),
          localization: Yup.string(),
          cnpj: Yup.string(),
          cf_df: Yup.string(),
          company_responsible: Yup.string(),
          observation: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataClients = {
          user_profile: data.user.user_profile,
          address: data.user.addresses[0],
          clients: {
            id: data.id,
            cf_df: data.cf_df,
            occuppation: data.occuppation,
            company_responsible: data.company_responsible,
            status: data.status,
          },
        };

        await api.put('/clients/update-client', dataClients);

        history.push('/list-clients');

        addToast({
          type: 'success',
          title: 'Atualização realizada!',
          description: 'Cliente atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro na Atualização!',
            description: 'Ocorreu um erro ao fazer atualizão, cheque os dados!',
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na Atualização!',
          description: 'Ocorreu um erro ao fazer atualizão, cheque os dados!',
        });
      }
    },
    [addToast, history],
  );

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
                <Client key={client.id} onClick={() => toggleModal(client)}>
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
              <Form
                initialData={editClient}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="dados">
                  <div className="h1">
                    <h1>{editClient?.user.user_profile.fullname}</h1>
                    <FiXCircle onClick={() => toggleModal()} />
                  </div>

                  <div className="data">
                    <div className="div-personal">
                      <h5>*Dados pessoais*</h5>
                      <div className="contact">
                        <InputEdit
                          name="user.user_profile.rg"
                          placeholder="RG"
                        />
                        <InputEdit
                          name="user.user_profile.cpf"
                          placeholder="CPF"
                        />
                        <InputEdit
                          name="user.user_profile.tel"
                          placeholder="Telefone"
                        />
                        <InputEdit
                          name="user.user_profile.cel"
                          placeholder="Celular"
                        />
                        <InputDatePickerEdit
                          name="user.user_profile.birth_date"
                          icon={FiCalendar}
                        />
                        <InputEdit name="occuppation" placeholder="profissão" />
                        <div className="id">
                          <InputEdit name="user.user_profile.id" />
                        </div>
                      </div>
                    </div>
                    <div className="div-address">
                      <h5>*Endereço*</h5>
                      <div className="address">
                        <div className="div-address-1">
                          <InputEdit
                            name="user.addresses[0].zip_code"
                            placeholder="CEP"
                            onChange={(event) => {
                              if (event.target.value.length === 8) {
                                searchAddress(event.target.value);
                              }
                            }}
                          />
                          <InputEdit
                            name="user.addresses[0].uf"
                            placeholder="UF"
                          />
                          <InputEdit
                            name="user.addresses[0].city"
                            placeholder="Cidade"
                          />
                          <InputEdit
                            name="user.addresses[0].neighborhood"
                            placeholder="Bairro"
                          />
                          <InputEdit
                            name="user.addresses[0].address"
                            placeholder="Endereço"
                          />
                        </div>
                        <div className="div-address-2">
                          <InputEdit
                            name="user.addresses[0].complement"
                            placeholder="Complemento"
                          />
                          <InputEdit
                            name="user.addresses[0].number"
                            placeholder="numero"
                          />

                          <InputEdit
                            name="user.addresses[0].reference_points"
                            placeholder="Pontos de referência"
                          />

                          <InputEdit
                            name="user.addresses[0].nearest_subway_station"
                            placeholder="Estação de metrô mais próxima"
                          />
                          <InputEdit
                            name="user.addresses[0].localization"
                            placeholder="Localização"
                          />
                          <div className="id">
                            <InputEdit name="user.addresses[0].id" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="div-company">
                      <h5>*Empresa*</h5>
                      <div className="company">
                        <InputEdit
                          name="user.user_profile.cnpj"
                          placeholder="CNPJ"
                        />
                        <InputEdit name="cf_df" placeholder="CF_DF" />
                        <InputEdit
                          name="company_responsible"
                          placeholder="Responsavel pela empresa"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="select-status">
                  <h2>Status</h2>
                  <SelectEdit
                    name="status"
                    options={[
                      {
                        value: 'active',
                        label: 'Ativo',
                      },
                      {
                        value: 'inactive',
                        label: 'Inativo',
                      },
                      {
                        value: 'suspended',
                        label: 'Suspenso',
                      },
                    ]}
                  />
                </div>
                <div className="textarea-block">
                  <TextArea label="Comentários" name="observation" />
                </div>
                <div className="container-buttons">
                  <button type="submit" className="save">
                    Salvar
                  </button>

                  <div>
                    <button
                      type="button"
                      onClick={() => toggleModal()}
                      className="cancel"
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
