import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiPhone,
  FiSmartphone,
  FiMap,
  FiBriefcase,
  FiMapPin,
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
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

// import logoImg from '../../assets/Logo 15@2x.png';

import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
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
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          rg: Yup.string(),
          cpf: Yup.string().min(11, 'No mínimo 11 dígitos'),

          tel: Yup.string(),
          cel: Yup.string().min(11, 'No mínimo 11 dígitos'),
          occuppation: Yup.string().when('cpf', {
            is: (val) => !!val.length,
            then: Yup.string().required('campo obrigatório não preenchido'),
            otherwise: Yup.string(),
          }),

          uf: Yup.string()
            .max(2, 'No máximo 2 dígitos')
            .min(1, 'No mínimo 2 dígitos'),
          city: Yup.string().required('campo obrigatório não preenchido'),
          zip_code: Yup.string()
            .required('campo obrigatório não preenchido')
            .min(8, 'No mínimo 8 dígitos'),
          neighborhood: Yup.string().required(
            'campo obrigatório não preenchido',
          ),
          number: Yup.string().required('campo obrigatório não preenchido'),
          address: Yup.string().required('campo obrigatório não preenchido'),
          complement: Yup.string(),

          reference_points: Yup.string(),
          nearest_subway_station: Yup.string(),
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

        history.push('/list-appointments');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Cliente cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro!',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro Cliente</h1>
            <h3>Dados da conta</h3>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <h3>Dados pessoais</h3>
            <Input name="firstname" icon={FiUser} placeholder="Primeiro nome" />
            <Input name="lastname" icon={FiUser} placeholder="Sobrenome" />
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

            <Input
              name="occuppation"
              icon={FiBriefcase}
              placeholder="Profissão"
            />

            <h3>Endereço</h3>
            <InputMask
              name="zip_code"
              icon={FiMap}
              placeholder="CEP"
              mask="99.999-999"
            />
            <InputMask
              name="uf"
              icon={RiRoadMapLine}
              placeholder="UF"
              mask="aa"
            />
            <Input name="city" icon={RiCommunityLine} placeholder="Cidade" />

            <Input
              name="neighborhood"
              icon={RiRoadMapLine}
              placeholder="Bairro"
            />
            <Input name="address" icon={RiRoadMapLine} placeholder="Endereço" />
            <Input name="number" icon={RiRoadMapLine} placeholder="Número" />
            <Input
              name="complement"
              icon={RiRoadMapLine}
              placeholder="complemento"
            />

            <Input
              name="reference_points"
              icon={FiMapPin}
              placeholder="Pontos de referência"
            />
            <Input
              name="nearest_subway_station"
              icon={RiSubwayLine}
              placeholder="Estação de metro mais próxima"
            />

            <h3>Dados da empressa</h3>
            <InputMask
              name="cnpj"
              icon={RiProfileLine}
              placeholder="CNPJ"
              mask="99.999.999/9999-99"
            />
            <Input name="cf_df" icon={RiProfileLine} placeholder="CF DF" />
            <Input
              name="company_responsible"
              icon={FiUser}
              placeholder="Responsavel"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/list-appointments">
            <FiArrowLeft />
            Voltar para Lista
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateClient;
