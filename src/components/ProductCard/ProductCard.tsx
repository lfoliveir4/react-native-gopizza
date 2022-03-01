import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

import {
  Container,
  Name,
  Image,
  Description,
  Details,
  Content,
  Divider,
  Identification
} from './styles'

export type ProductProps = {
  id: string
  photo_url: string
  name: string
  description: string
}

type Props = RectButtonProps & {
  data: ProductProps
}


export default function ProductCard({data, ...rest}: Props): ReactElement {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Content {...rest}>
        <Image source={{uri: data.photo_url}}/>

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name='chevron-right' size={18} color={COLORS.SHAPE}/>
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Divider />
    </Container>
  )
}