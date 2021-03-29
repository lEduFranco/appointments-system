import React, { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import {
  FiAlertCircle,
  FiCalendar,
  FiKey,
  FiLock,
  FiMap,
  FiMapPin,
  FiPhone,
  FiSmartphone,
  FiUser,
  FiXCircle,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { parseISO } from 'date-fns';
import cep from 'cep-promise';
import { useHistory } from 'react-router';
import {
  RiCommunityLine,
  RiProfileLine,
  RiRoadMapLine,
  RiSubwayLine,
} from 'react-icons/ri';
import HeaderVertical from '../../components/HeaderVertical';
import InputEdit from '../../components/InputEdit';
import InputDatePickerEdit from '../../components/InputDatePickerEdit';
import SelectEdit from '../../components/SelectEdit';
import TextArea from '../../components/TextArea';

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
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

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
  begin_date: Date;
  final_date: Date | null;
  demission_reason: string;
  uniform_size: string;
  voter_registration: string;
  voting_zone: string;
  voting_section: string;
  password_mei: string;
  status: string;
  uniform_amount: number;
  relatives_contacts: string;
  disc: string;
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
      pix: string;
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

const ListProviders: React.FC = (Data) => {
  const { addToast } = useToast();
  const history = useHistory();

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
      const { user, begin_date, final_date, ...restProvider } = provider;
      const { user_profile, ...addresses } = user;
      const { birth_date, ...restUserProfile } = user_profile;
      const birthDateString = birth_date.toString();
      const beginDateString = begin_date.toString();
      const finalDateString = final_date ? final_date.toString() : null;
      const parsedFinalDateString = finalDateString
        ? parseISO(finalDateString)
        : null;

      const mapProvider = {
        ...restProvider,
        begin_date: parseISO(beginDateString),
        final_date: parsedFinalDateString,
        user: {
          user_profile: {
            ...restUserProfile,
            birth_date: parseISO(birthDateString),
          },
          ...addresses,
        },
      };
      setEditProvider(mapProvider);
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

  const selectOptions = [
    {
      value: 'active',
      label: 'Ativa',
    },
    {
      value: 'inactive',
      label: 'Inativa',
    },
    {
      value: 'suspended',
      label: 'Suspensa',
    },
  ];

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
          begin_date: Yup.string(),
          uniform_size: Yup.string(),
          voter_registration: Yup.string(),
          observation: Yup.string(),

          voting_zone: Yup.string(),
          voting_section: Yup.string(),
          password_mei: Yup.string(),
          status: Yup.string().required(),
          uniform_amount: Yup.number(),
          relatives_contacts: Yup.string(),
          disc: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataProviders = {
          user_profile: data.user.user_profile,
          address: data.user.addresses[0],
          providers: {
            id: data.id,
            begin_date: data.begin_date,
            final_date: data.final_date,
            demission_reason: data.demission_reason,
            uniform_size: data.uniform_size,
            voter_registration: data.voter_registration,
            voting_zone: data.voting_zone,
            voting_section: data.voting_section,
            password_mei: data.password_mei,
            status: data.status,
            uniform_amount: data.uniform_amount,
            relatives_contacts: data.relatives_contacts,
            disc: data.disc,
          },
        };

        await api.put('/providers/update-provider', dataProviders);

        history.push('/dashboard');

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
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="dados">
                  <div className="h1">
                    <h1>{editProvider?.user.user_profile.fullname}</h1>
                    <FiXCircle onClick={() => toggleModal()} />
                  </div>

                  <div className="data">
                    <div className="div-personal">
                      <h5>*Dados pessoais*</h5>
                      <div className="contact">
                        <InputEdit
                          name="user.user_profile.rg"
                          icon={RiProfileLine}
                          placeholder="RG"
                        />
                        <InputEdit
                          name="user.user_profile.cpf"
                          icon={RiProfileLine}
                          placeholder="CPF"
                        />
                        <InputEdit
                          name="user.user_profile.cel"
                          icon={FiSmartphone}
                          placeholder="Celular"
                        />
                        <InputEdit
                          name="user.user_profile.tel"
                          icon={FiPhone}
                          placeholder="Telefone"
                        />
                        <h6>*data de nascimento*</h6>
                        <InputDatePickerEdit
                          name="user.user_profile.birth_date"
                          icon={FiCalendar}
                        />
                        <InputEdit name="user.user_profile.pix" icon={FiKey} />
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
                            icon={FiMap}
                            placeholder="CEP"
                            onChange={(event) => {
                              if (event.target.value.length === 8) {
                                searchAddress(event.target.value);
                              }
                            }}
                          />
                          <InputEdit
                            name="user.addresses[0].uf"
                            icon={RiRoadMapLine}
                            placeholder="UF"
                          />
                          <InputEdit
                            name="user.addresses[0].city"
                            icon={RiCommunityLine}
                            placeholder="Cidade"
                          />
                          <InputEdit
                            name="user.addresses[0].neighborhood"
                            icon={RiCommunityLine}
                            placeholder="Bairro"
                          />
                          <InputEdit
                            name="user.addresses[0].address"
                            icon={RiCommunityLine}
                            placeholder="Endereço"
                          />
                          <div className="id">
                            <InputEdit name="user.user_profile.id" />
                          </div>
                        </div>
                        <div className="div-address-2">
                          <InputEdit
                            name="user.addresses[0].complement"
                            icon={RiCommunityLine}
                            placeholder="Complemento"
                          />
                          <InputEdit
                            name="user.addresses[0].number"
                            icon={RiCommunityLine}
                            placeholder="numero"
                          />

                          <InputEdit
                            name="user.addresses[0].reference_points"
                            icon={RiRoadMapLine}
                            placeholder="Pontos de referência"
                          />

                          <InputEdit
                            name="user.addresses[0].nearest_subway_station"
                            icon={RiSubwayLine}
                            placeholder="Estação de metrô mais próxima"
                          />
                          <InputEdit
                            name="user.addresses[0].localization"
                            icon={FiMapPin}
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
                        <div className="div-company-1">
                          <InputEdit
                            name="user.user_profile.cnpj"
                            icon={RiProfileLine}
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
                            icon={FiAlertCircle}
                            placeholder="Motivo da demissão"
                          />
                          <InputEdit
                            name="uniform_size"
                            icon={FiUser}
                            placeholder="Tamanho do unifome"
                          />
                          <InputEdit
                            name="uniform_amount"
                            icon={FiUser}
                            placeholder="Quantidade de Uniformes"
                          />
                        </div>
                        <div className="div-company-2">
                          <InputEdit
                            name="voter_registration"
                            icon={RiProfileLine}
                            placeholder="Título de eleitor"
                          />
                          <InputEdit
                            name="voting_zone"
                            icon={RiProfileLine}
                            placeholder="Zona de votação"
                          />
                          <InputEdit
                            name="voting_section"
                            icon={RiProfileLine}
                            placeholder="seção de votação"
                          />
                          <InputEdit
                            name="password_mei"
                            icon={FiLock}
                            placeholder="senha MEI"
                          />
                          <InputEdit
                            name="relatives_contacts"
                            icon={FiSmartphone}
                            placeholder="Contato de parentes"
                          />
                          <InputEdit
                            name="disc"
                            icon={FiUser}
                            placeholder="DISC"
                          />
                          <div className="id">
                            <InputEdit name="id" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="select-status">
                  <h2>Status</h2>
                  <SelectEdit name="status">
                    {selectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectEdit>
                </div>

                <div className="textarea-block">
                  <TextArea
                    label="Observações"
                    name="user.user_profile.observation"
                  />
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

export default ListProviders;
