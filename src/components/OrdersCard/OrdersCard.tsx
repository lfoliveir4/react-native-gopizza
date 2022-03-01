import React, { ReactElement } from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Image,
  Name,
  StatusContainer,
  Description,
  StatusLabel,
  StatusTypesProps
} from './styles'

type Pizza = {
  name: String
}

export type OrderProps = {
  id: string
  pizza: Pizza
  image: string
  status: StatusTypesProps
  table_number: string
  quantity: number
}

type Props = TouchableOpacityProps & {
  index: number
  data: OrderProps
}

export default function OrdersCard({ index, data, ...rest }: Props): ReactElement {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: data.image }} />

      <Name>{data.pizza?.name}</Name>

      <Description>
        Mesa {data.table_number} - Qnt: {data.quantity}
      </Description>

      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>{data.status}</StatusLabel>
      </StatusContainer>
    </Container>
  )
}
