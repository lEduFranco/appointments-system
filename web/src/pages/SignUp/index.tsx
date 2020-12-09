import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/Logo 15@2x.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
// import Select from '../../components/Select';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
  email: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  // const [role, setRole] = useState('');

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('campo obrigató não preenchido'),

          email: Yup.string()
            .required('campo obrigató não preenchido')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/create-appointments');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="ToMaisVip" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="role" icon={FiUser} placeholder="perfil" />

            {/* <Select
              name="role"
              label=""
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              options={[
                { value: 'admin', label: 'Administrador' },
                { value: 'provider', label: 'Diarista' },
                { value: 'rh', label: 'RH' },
                { value: 'secretary', label: 'Secretária' },
                { value: 'client', label: 'Cliente' },
              ]}
            /> */}
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/list-providers">
            <FiArrowLeft />
            Voltar para Lista
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
