import React, { ReactElement } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TypeProps } from './styles'

type Props = TextInputProps & {
  type?: TypeProps
}

export default function Input({ type = 'primary', ...rest }: Props): ReactElement {
  return <Container type={type} {...rest} />
}