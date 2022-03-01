import React, {ReactElement, useEffect, useState, useCallback} from 'react';
import {Platform, ScrollView, FlatList, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'

import ButtonBack from "@components/ButtonBack";
import ButtonRadio from "@components/ButtonRadio";
import Input from "@components/Input";
import Button from "@components/Button";

import {PIZZA_TYPES} from "@utils/pizzaTypes";



import {
  Container,
  Header,
  Title
} from './styles'
import OrdersCard from "@components/OrdersCard";
import Divider from "@components/Divider";
import { useAuth } from '@hooks/auth';
import { OrderProps } from '@components/OrdersCard/OrdersCard';

export default function Orders(): ReactElement {
  const [orders, setOrders] = useState<OrderProps[]>([])

  const { user } = useAuth()

  function handlePizzaDelivered(id: string) {
    return Alert.alert('Pedido', "Confirmar que a pizza foi entregue?", [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().collection('order').doc(id).update({
            status: 'Entregue'
          })
        }
      }
    ])

  }


  useEffect(() => {
    const subscribe = firestore()
    .collection('order')
    .where('waiter_id', '==', user?.id)
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as OrderProps[]

      setOrders(data)
    }) 

    return () => subscribe()
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos Feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <OrdersCard 
            index={index} 
            data={item}
            disabled={item.status === 'Entregue'} 
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <Divider/>}
      />
    </Container>
  );
}
