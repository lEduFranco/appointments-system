import React, { useCallback, useRef } from 'react';
import cep from 'cep-promise';
import {
  FiMail,
  FiUser,
  FiLock,
  FiPhone,
  FiSmartphone,
  FiMap,
  FiCalendar,
  FiArrowLeft,
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
  begin_date: Date;
}

interface CepPromise {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
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
          password: Yup.string()
            .min(6, 'No mínimo 6 dígitos')
            .required('campo obrigatório não preenchido'),
          rg: Yup.string()
            .min(7, 'No mínimo 7 dígitos')
            .required('campo obrigatório não preenchido'),
          cpf: Yup.string()
            .min(11, 'No mínimo 11 dígitos')
            .required('campo obrigatório não preenchido'),
          cnpj: Yup.string()
            .min(14, 'No mínimo 14 dígitos')
            .required('campo obrigatório não preenchido'),
          tel: Yup.string()
            .min(10, 'No mínimo 10 dígitos')
            .required('campo obrigatório não preenchido'),
          cel: Yup.string()
            .min(11, 'No máximo 11 dígitos')
            .required('campo obrigatório não preenchido'),
          uf: Yup.string()
            .max(2, 'No máximo 2 dígitos')
            .min(1, 'No mínimo 2 dígitos')
            .required('campo obrigatório não preenchido'),
          city: Yup.string().required('campo obrigatório não preenchido'),
          zip_code: Yup.string()
            .min(8, 'No mínimo 8 dígitos')
            .required('campo obrigatório não preenchido'),
          neighborhood: Yup.string().required(
            'campo obrigatório não preenchido',
          ),
          number: Yup.string(),
          address: Yup.string().required('campo obrigatório não preenchido'),
          complement: Yup.string(),

          begin_date: Yup.string().required('campo obrigatório não preenchido'),
          uniform_size: Yup.string()
            .max(2, 'No máximo 2 dígitos')
            .min(1, 'No mínimo 1 dígito')
            .required('campo obrigatório não preenchido'),
          voter_registration: Yup.string()
            .max(12, 'No máximo 12 dígitos')
            .min(12, 'No mínimo 12 dígitos')
            .required('campo obrigatório não preenchido'),
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

        history.push('/dashoboard');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Diarista cadastrada com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return addToast({
            type: 'error',
            title: 'Erro no cadastro!',
            description:
              'Ocorreu um erro ao fazer cadastro, cheque as informações!',
          });
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

  const searchAddress = useCallback(async (zipcode: string) => {
    try {
      cep(zipcode).then((data: CepPromise) => {
        formRef?.current.setFieldValue('uf', data.state);
        formRef?.current.setFieldValue('city', data.city);
        formRef?.current.setFieldValue('neighborhood', data.neighborhood);
        formRef?.current.setFieldValue('address', data.street);
      });
    } catch {}
  }, []);

  return (
    <Container>
      <HeaderVertical />

      <Content>
        <AnimationContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ begin_date: new Date() }}
          >
            <h1>Cadastro Diarista</h1>

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
                  icon={RiRoadMapLine}
                  placeholder="Bairro"
                />
                <Input
                  name="address"
                  icon={RiRoadMapLine}
                  placeholder="Endereço"
                />
                <h5>*opcional*</h5>
                <Input
                  name="complement"
                  icon={RiRoadMapLine}
                  placeholder="complemento (do endereço)"
                />
                <h5>*opcional*</h5>
                <Input
                  name="number"
                  icon={RiRoadMapLine}
                  placeholder="Número"
                />
              </div>

              <div>
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
              </div>
            </MultiStep>
          </Form>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar para Dashboard
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateProvider;
