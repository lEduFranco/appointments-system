import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiPhone,
  FiSmartphone,
  FiClipboard,
  FiMap,
  FiCalendar,
} from 'react-icons/fi';
import { RiCommunityLine, RiProfileLine, RiRoadMapLine } from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { format } from 'date-fns';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

// import logoImg from '../../assets/Logo 15@2x.png';

import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import InputDatePicker from '../../components/InputDatePicker';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
  begin_date: Date;
}

const CreateProvider: React.FC = () => {
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
          rg: Yup.string().min(7, 'No mínimo 7 dígitos'),
          cpf: Yup.string().min(11, 'No mínimo 11 dígitos'),
          cnpj: Yup.string().min(14, 'No mínimo 14 dígitos'),
          tel: Yup.string().min(10, 'No mínimo 10 dígitos'),
          cel: Yup.string().min(11, 'No máximo 11 dígitos'),
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

          begin_date: Yup.string().required('campo obrigatório não preenchido'),
          uniform_size: Yup.string()
            .max(2, 'No máximo 2 dígitos')
            .min(1, 'No mínimo 1 dígitos'),
          voter_registration: Yup.string()
            .max(12, 'No máximo 12 dígitos')
            .min(12, 'No mínimo 12 dígitos'),
          voting_zone: Yup.string().required(
            'campo obrigatório não preenchido',
          ),
          voting_section: Yup.string().required(
            'campo obrigatório não preenchido',
          ),
          password_mei: Yup.string().required(
            'campo obrigatório não preenchido',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { begin_date, ...rest } = data;

        const dataProviders = {
          ...rest,
          role: 'provider',
          begin_date: format(new Date(begin_date), 'yyyy-MM-dd'),
        };

        await api.post('/providers', dataProviders);

        history.push('/list-appointments');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Diarista cadastrada com sucesso!',
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
          {/* <img src={logoImg} alt="ToMaisVip" /> */}

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ begin_date: new Date() }}
          >
            <h1>Cadastro Diarista</h1>
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
              mask="(99) 9999-99999"
            />
            <InputMask
              name="cel"
              icon={FiSmartphone}
              placeholder="Celular"
              mask="(99) 9 9999-9999"
            />
            <InputMask
              name="voter_registration"
              icon={RiProfileLine}
              placeholder="Título da eleitor"
              mask="999999999999"
            />
            <Input
              name="voting_zone"
              icon={RiRoadMapLine}
              placeholder="zona da votação"
            />
            <Input
              name="voting_section"
              icon={RiRoadMapLine}
              placeholder="seção de votação"
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

            <h3>Dados da diarista</h3>
            <InputMask
              name="cnpj"
              icon={RiProfileLine}
              placeholder="CNPJ"
              mask="99.999.999/9999-99"
            />
            <InputDatePicker name="begin_date" icon={FiCalendar} />
            <InputMask
              name="uniform_size"
              icon={FiUser}
              placeholder="Tamanho do uniforme"
              mask="aa"
            />
            <Input
              name="password_mei"
              icon={FiLock}
              type="password"
              placeholder="Senha MEI"
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

export default CreateProvider;
