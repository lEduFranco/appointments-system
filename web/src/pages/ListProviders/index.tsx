import React, { useCallback, useRef, useState } from 'react';

import { FiCalendar, FiXCircle } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { parseISO } from 'date-fns';
import cep from 'cep-promise';
import HeaderVertical from '../../components/HeaderVertical';
import InputEdit from '../../components/InputEdit';
import InputDatePickerEdit from '../../components/InputDatePickerEdit';

import useGetProviders from './useGetProviders';

import {
  Container,
  Content,
  Div,
  StyledModal,
  Schedule,
  Search,
  ProvidersList,
  Provider,
} from './styles';
import { useToast } from '../../hooks/toast';

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
  begin_date: Date;
  final_date: Date;
  demission_reason: string;
  uniform_size: string;
  voter_registration: string;
  voting_zone: string;
  voting_section: string;
  password_mei: string;
  status: string;
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

interface CepPromise {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

const ListProviders: React.FC = (Data) => {
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const [providers, setProviders] = useState<Data[]>([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState('');
  const [editProvider, setEditProvider] = useState<Data>();
  const [isOpen, setIsOpen] = useState(false);

  useGetProviders({
    setProviders,
    autoCompleteValue,
  });

  function toggleModal(provider?: Data): void {
    setIsOpen(!isOpen);
    if (provider) {
      const { user, begin_date, ...restProvider } = provider;
      const { user_profile, ...addresses } = user;
      const { birth_date, ...restUserProfile } = user_profile;
      const birthDateString = birth_date.toString();
      const beginDateString = begin_date.toString();
      // const finalDateString = final_date.toString();

      const mapClient = {
        ...restProvider,
        begin_date: parseISO(beginDateString),
        // final_date: parseISO(finalDateString),
        user: {
          user_profile: {
            ...restUserProfile,
            birth_date: parseISO(birthDateString),
          },
          ...addresses,
        },
      };
      setEditProvider(mapClient);
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

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <Div>
          <Schedule>
            <h1>Diaristas</h1>
          </Schedule>

          <Search>
            <input
              onChange={(event) => setAutoCompleteValue(event.target.value)}
              value={autoCompleteValue}
              placeholder="Digite nome/sobrenome"
            />
          </Search>

          <ProvidersList>
            {providers.map((provider) => {
              return (
                <Provider
                  key={provider.id}
                  onClick={() => toggleModal(provider)}
                >
                  <h1>{provider.user.user_profile.fullname}</h1>
                </Provider>
              );
            })}
          </ProvidersList>

          <StyledModal
            isOpen={isOpen}
            onBackgroundClick={() => toggleModal()}
            onEscapeKeydown={() => toggleModal()}
          >
            <div className="modal">
              <Form
                initialData={editProvider}
                onSubmit={() => {}}
                ref={formRef}
              >
                <div className="dados">
                  <div className="h1">
                    <h1>{editProvider?.user.user_profile.fullname}</h1>
                    <FiXCircle onClick={() => toggleModal()} />
                  </div>

                  <div className="data">
                    <div className="div-personal">
                      <h5>*dados pessoais*</h5>
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
                        <h6>*data de nascimento*</h6>
                        <InputDatePickerEdit
                          name="user.user_profile.birth_date"
                          icon={FiCalendar}
                        />
                      </div>
                    </div>
                    <div className="div-address">
                      <h5>*endereço*</h5>
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
                        </div>
                      </div>
                    </div>
                    <div className="div-company">
                      <h5>*empresa*</h5>
                      <div className="company">
                        <div className="div-company-1">
                          <InputEdit
                            name="user.user_profile.cnpj"
                            placeholder="CNPJ"
                          />
                          <h6>*data de admissão*</h6>
                          <InputDatePickerEdit
                            name="begin_date"
                            icon={FiCalendar}
                          />
                          <h6>*data de demissão*</h6>
                          <InputDatePickerEdit
                            name="final_date"
                            icon={FiCalendar}
                          />
                          <InputEdit
                            name="demission_reason"
                            placeholder="Motivo da demissão"
                          />
                          <InputEdit
                            name="uniform_size"
                            placeholder="Tamanho do unifome"
                          />
                        </div>
                        <div className="div-company-2">
                          <InputEdit
                            name="voter_registration"
                            placeholder="Título de eleitor"
                          />
                          <InputEdit
                            name="voting_zone"
                            placeholder="Zona de votação"
                          />
                          <InputEdit
                            name="voting_section"
                            placeholder="seção de votação"
                          />
                          <InputEdit
                            name="password_mei"
                            placeholder="senha MEI"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default ListProviders;
