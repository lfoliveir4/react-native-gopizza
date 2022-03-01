import React, {ReactElement, useEffect, useState, useCallback} from 'react';
import {Alert, Platform, ScrollView} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import ButtonBack from "@components/ButtonBack";
import ButtonRadio from "@components/ButtonRadio";
import Input from "@components/Input";
import Button from "@components/Button";

import {PIZZA_TYPES} from "@utils/pizzaTypes";

import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Sizes,
  Form,
  Label,
  InputGroup,
  Title,
  Price,
  FormRow
} from './styles'
import { OrderNavigationProps } from '../../@types/navigation';
import { ProductProps } from '@components/ProductCard';
import { useAuth } from '@hooks/auth';
import { getStorageErrorMessageFromErrorCode } from '@helpers/errorsFirebaseStorage';


type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number
  }
}


export default function Order(): ReactElement {
  const [size, setSize] = useState('')
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse)
  const [quantity, setQuantity] = useState(0)
  const [tableNumber, setTableNumber] = useState('')
  const [sendOrder, setSendOrder] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()

  const { user } = useAuth()

  const { id } = route.params as OrderNavigationProps

  const amount = size ? pizza.prices_sizes[size] * quantity : '0,00'

  function handleSendOrder() {
    if (!size) {
      return Alert.alert('Pedido', 'Selecione o tamanho da pizza ')
    }

    if (!tableNumber) {
      return Alert.alert('Pedido', 'Informe o número da mesa ')
    }

    if (!quantity) {
      return Alert.alert('Pedido', 'Informe a quantidade')

    }

    setSendOrder(true)

    firestore()
      .collection('order')
      .add({
        quantity,
        amount,
        pizza,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id, 
        image: pizza.photo_url
      })
      .then(() => navigation.navigate('Home'))
      .catch(error => {
        getStorageErrorMessageFromErrorCode(error.code)
        setSendOrder(false)
      })
  }


  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => Alert.alert('Pedido', 'Não foi possivel carregar o produto'))
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack
            onPress={() => navigation.goBack()}
            style={{marginBottom: 108}}
          />
        </Header>

        <Photo source={{uri: pizza.photo_url}}/>

        <Form>
          <Title>{pizza.name}</Title>
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <ButtonRadio
                key={item.id}
                title={item.name}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType='numeric'
                onChangeText={setTableNumber}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType='numeric'
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ ${amount}</Price>

          <Button
            title='Confirmar Pedido'
            onPress={handleSendOrder}
            isLoading={sendOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}
