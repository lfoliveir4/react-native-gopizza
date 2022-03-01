import React, { ReactElement } from 'react';
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

export default function ButtonBack({ ...rest }: TouchableOpacityProps): ReactElement {
  const { COLORS } = useTheme()

  return (
    <Container {...rest}>
      <MaterialIcons name='chevron-left' size={18} color={COLORS.TITLE} />
    </Container>
  )
}