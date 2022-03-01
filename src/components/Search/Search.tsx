import React, { ReactElement } from 'react';
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'


import {
  Container,
  ButtonClear,
  Input,
  SearchButton,
  InputArea

} from './styles'

type Props = TextInputProps & {
  onSearch: () => void
  onClear: () => void
}


export default function Search({ onSearch, onClear, ...rest }: Props): ReactElement {
  const { COLORS } = useTheme()

  return (
    <Container>
      <InputArea>
        <Input placeholder='Pesquisar' {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name='x' size={16} />
        </ButtonClear>
      </InputArea>

      <SearchButton onPress={onSearch}>
        <Feather name='search' size={16} color={COLORS.TITLE} />
      </SearchButton>
    </Container>
  )
}