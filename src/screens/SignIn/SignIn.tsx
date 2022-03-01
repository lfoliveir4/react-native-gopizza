import React, {ReactElement, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native'
import Input from '@components/Input'
import Button from '@components/Button'

import { useAuth } from '@hooks/auth'

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel
} from './styles'

import brandImg from '@assets/brand.png'


export default function SignIn(): ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    signIn,
    isLogging,
    signOut,
    forgotPassword
  } = useAuth()

  function handleSignIn() {
    signIn(email, password)
  }

  function handleForgotPassword() {
    forgotPassword(email)
  }


  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>

          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            placeholder='E-mail'
            type='secondary'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setEmail}
          />

          <Input
            placeholder='Senha'
            type='secondary'
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type='secondary'
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}