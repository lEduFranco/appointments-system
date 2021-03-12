import React, { useCallback, useRef } from 'react';
import cep from 'cep-promise';

import {
  FiMail,
  FiUser,
  FiLock,
  FiPhone,
  FiSmartphone,
  FiMap,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
} from 'react-icons/fi';
import {
  RiSubwayLine,
  RiCommunityLine,
  RiProfileLine,
  RiRoadMapLine,
} from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import HeaderVertical from '../../components/HeaderVertical';
import InputDatePicker from '../../components/InputDatePicker';

import Button from '../../components/Button';
import MultiStep from '../../components/MultiStep';

import { Container, Content, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
}

interface CepPromise {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

const CreateClient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          firstname: Yup.string().required('campo obrigatório não preenchido'),
          lastname: Yup.string().required('campo obrigatório não preenchido'),

          email: Yup.string()
            .required('campo obrigatório não preenchido')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .min(6, 'No mínimo 6 dígitos')
            .required('campo obrigatório não preenchido'),
          rg: Yup.string(),
          cpf: Yup.string()
            .min(11, 'No mínimo 11 dígitos')
            .required('campo obrigatório não preenchido'),

          tel: Yup.string(),
          cel: Yup.string()
            .min(11, 'No mínimo 11 dígitos')
            .required('campo obrigatório não preenchido'),
          birth_date: Yup.string().required('campo obrigatório não preenchido'),
          occuppation: Yup.string(),

          zip_code: Yup.string()
            .min(8, 'No mínimo 8 dígitos')
            .required('campo obrigatório não preenchido'),
          uf: Yup.string()
            .max(2, 'No máximo 2 dígitos')
            .min(1, 'No mínimo 2 dígitos')
            .required('campo obrigatório não preenchido'),
          city: Yup.string().required('campo obrigatório não preenchido'),
          neighborhood: Yup.string().required(
            'campo obrigatório não preenchido',
          ),
          number: Yup.string().required('campo obrigatório não preenchido'),
          address: Yup.string().required('campo obrigatório não preenchido'),
          complement: Yup.string(),
          reference_points: Yup.string(),
          nearest_subway_station: Yup.string(),
          localization: Yup.string().required(
            'campo obrigatório não preenchido',
          ),

          cnpj: Yup.string(),
          cf_df: Yup.string(),
          company_responsible: Yup.string().when('cnpj', {
            is: (val) => !!val.length,
            then: Yup.string().required('campo obrigatório não preenchido'),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const datacClients = {
          ...data,
          role: 'client',
        };

        await api.post('/clients', datacClients);

        history.push('/schedule');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Cliente cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro no cadastro!',
            description:
              'Ocorreu um erro ao fazer cadastro, cheque as informações!',
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro!',
          description:
            'Ocorreu um erro ao fazer cadastro, cheque as informações!',
        });
      }
    },
    [addToast, history],
  );

  const searchAddress = useCallback(
    async (zipcode: string) => {
      try {
        cep(zipcode).then((data: CepPromise) => {
          formRef?.current?.setFieldValue('uf', data.state);
          formRef?.current?.setFieldValue('city', data.city);
          formRef?.current?.setFieldValue('neighborhood', data.neighborhood);
          formRef?.current?.setFieldValue('address', data.street);
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
        <AnimationContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ birth_date: new Date() }}
          >
            <h1>Cadastrar Cliente</h1>

            <MultiStep>
              <div>
                <h3>Dados da conta</h3>
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />
              </div>

              <div>
                <h3>Dados da pessoais</h3>
                <Input
                  name="firstname"
                  icon={FiUser}
                  placeholder="Primeiro nome"
                />
                <Input name="lastname" icon={FiUser} placeholder="Sobrenome" />
                <h5>*opcional*</h5>
                <InputMask
                  name="rg"
                  icon={RiProfileLine}
                  placeholder="RG"
                  mask="9.999.999"
                />
                <InputMask
                  name="cpf"
                  icon={RiProfileLine}
                  placeholder="CPF"
                  mask="999.999.999-99"
                />
                <h5>*opcional*</h5>
                <InputMask
                  name="tel"
                  icon={FiPhone}
                  placeholder="Telefone"
                  mask="(99) 9999-9999"
                />
                <InputMask
                  name="cel"
                  icon={FiSmartphone}
                  placeholder="Celular"
                  mask="(99) 9 9999-9999"
                />
                <h5>*Data de nascimento*</h5>
                <InputDatePicker name="birth_date" icon={FiCalendar} />

                <h5>*opcional*</h5>
                <Input
                  name="occuppation"
                  icon={FiBriefcase}
                  placeholder="Profissão"
                />
              </div>

              <div>
                <h3>Endereço</h3>
                <Input
                  name="zip_code"
                  icon={FiMap}
                  placeholder="CEP"
                  onChange={(event) => {
                    if (event.target.value.length === 8) {
                      searchAddress(event.target.value);
                    }
                  }}
                />
                <Input name="uf" icon={RiRoadMapLine} placeholder="UF" />
                <Input
                  name="city"
                  icon={RiCommunityLine}
                  placeholder="Cidade"
                />
                <Input
                  name="neighborhood"
                  icon={RiCommunityLine}
                  placeholder="Bairro"
                />
                <Input
                  name="address"
                  icon={RiCommunityLine}
                  placeholder="Endereço"
                />
                <h5>*opcional*</h5>
                <Input
                  name="complement"
                  icon={RiCommunityLine}
                  placeholder="complemento (do endereço)"
                />
                <Input
                  name="number"
                  icon={RiCommunityLine}
                  placeholder="Número"
                />
                <h5>*opcional*</h5>
                <Input
                  name="reference_points"
                  icon={RiRoadMapLine}
                  placeholder="Pontos de referência"
                />
                <h5>*opcional*</h5>
                <Input
                  name="nearest_subway_station"
                  icon={RiSubwayLine}
                  placeholder="Estação de metro mais próxima"
                />
                <Input
                  name="localization"
                  icon={FiMapPin}
                  placeholder="Localização"
                />
              </div>

              <div>
                <h3>Dados da empresa (Opcional)</h3>
                <h5>*opcional*</h5>
                <InputMask
                  name="cnpj"
                  icon={RiProfileLine}
                  placeholder="CNPJ"
                  mask="99.999.999/9999-99"
                />
                <h5>*opcional*</h5>
                <Input name="cf_df" icon={RiProfileLine} placeholder="CF DF" />
                <h5>*opcional*</h5>
                <Input
                  name="company_responsible"
                  icon={FiUser}
                  placeholder="Responsavel"
                />

                <Button type="submit">Cadastrar</Button>
              </div>
            </MultiStep>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateClient;
