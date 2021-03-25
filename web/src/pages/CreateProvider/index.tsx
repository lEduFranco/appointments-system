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
  FiMapPin,
  FiKey,
} from 'react-icons/fi';
import {
  RiCommunityLine,
  RiProfileLine,
  RiRoadMapLine,
  RiSubwayLine,
} from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

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
          tel: Yup.string(),
          cel: Yup.string()
            .min(11, 'No máximo 11 dígitos')
            .required('campo obrigatório não preenchido'),
          relatives_contacts: Yup.string()
            .min(11, 'No máximo 11 dígitos')
            .required('campo obrigatório não preenchido'),
          birth_date: Yup.string().required('campo obrigatório não preenchido'),
          pix: Yup.string().required('campo obrigatório não preenchido'),

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
          reference_points: Yup.string(),
          nearest_subway_station: Yup.string(),
          localization: Yup.string().required(
            'campo obrigatório não preenchido',
          ),

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
          uniform_amount: Yup.number().required(
            'campo obrigatório não preenchido',
          ),
          disc: Yup.string().required('campo obrigatório não preenchido'),
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

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Diarista cadastrada com sucesso!',
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

  const searchAddress = useCallback(async (zipcode: string) => {
    try {
      cep(zipcode).then((data: CepPromise) => {
        formRef?.current?.setFieldValue('uf', data.state);
        formRef?.current?.setFieldValue('city', data.city);
        formRef?.current?.setFieldValue('neighborhood', data.neighborhood);
        formRef?.current?.setFieldValue('address', data.street);
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
            initialData={{ begin_date: new Date(), birth_date: new Date() }}
          >
            <h1>Cadastrar Diarista</h1>

            <MultiStep>
              <div>
                <h3>Dados da conta</h3>
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} placeholder="Senha" />
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
                <InputMask
                  name="cel"
                  icon={FiSmartphone}
                  placeholder="Celular"
                  mask="(99) 9 9999-9999"
                />
                <h5>*opcional*</h5>
                <InputMask
                  name="tel"
                  icon={FiPhone}
                  placeholder="Telefone"
                  mask="(99) 9999-99999"
                />
                <InputMask
                  name="relatives_contacts"
                  icon={FiSmartphone}
                  placeholder="Contato de parentes"
                  mask="(99) 9 9999-9999  (99) 9 9999-9999"
                />
                <h5>*Data de nascimento*</h5>
                <InputDatePicker name="birth_date" icon={FiCalendar} />
                <InputMask
                  name="voter_registration"
                  icon={RiProfileLine}
                  placeholder="Título da eleitor"
                  mask="999999999999"
                />
                <Input
                  name="voting_zone"
                  icon={RiProfileLine}
                  placeholder="zona da votação"
                />
                <Input
                  name="voting_section"
                  icon={RiProfileLine}
                  placeholder="seção de votação"
                />
                <Input name="pix" icon={FiKey} placeholder="PIX" />
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
                <h5>*opcional*</h5>
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
                  name="uniform_amount"
                  icon={FiUser}
                  placeholder="Quantidade de uniformes"
                />
                <Input
                  name="password_mei"
                  icon={FiLock}
                  placeholder="Senha MEI"
                />
                <Input name="disc" icon={FiUser} placeholder="DISC" />

                <Button type="submit">Cadastrar</Button>
              </div>
            </MultiStep>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateProvider;
