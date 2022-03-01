import React, { ReactElement } from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Title,
  Radio,
  RadioSelected,
  ButtonRadioProps
} from './styles'

type Props = TouchableOpacityProps & ButtonRadioProps & {
  title: string
}

export default function ButtonRadio({ title, selected = false, ...rest }: Props): ReactElement {
  return (
    <Container selected={selected} {...rest}>
      <Radio>{selected && <RadioSelected />}</Radio>
      <Title>{title}</Title>
    </Container>
  )
}
