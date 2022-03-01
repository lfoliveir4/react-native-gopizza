import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, TypeProps, Title, Load } from './styles'

type Props = RectButtonProps & {
  title: string
  type?: TypeProps
  isLoading?: boolean
}

export default function Button({
  title,
  type = 'primary',
  isLoading = false,
  ...rest
}: Props): ReactElement {
  return (
    <Container type={type} enabled={!isLoading} {...rest}>
      { isLoading ? <Load /> : <Title>{title}</Title> }
    </Container>
  )
}