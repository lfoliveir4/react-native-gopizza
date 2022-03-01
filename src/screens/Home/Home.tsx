import React, {ReactElement, useEffect, useState, useCallback} from 'react';
import {MaterialIcons} from '@expo/vector-icons'
import {Platform, TouchableOpacity, FlatList, Alert} from 'react-native'
import {BorderlessButton} from 'react-native-gesture-handler'
import {useTheme} from 'styled-components/native'
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import happyEmoji from '@assets/happy.png'

import SearchComponent from '@components/Search'
import ProductCard from '@components/ProductCard'

import {ProductProps} from "@components/ProductCard/ProductCard";


import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsCounter,
  MenuHeaderTitle,
  NewProductButton
} from './styles'
import {getStorageErrorMessageFromErrorCode} from "@helpers/errorsFirebaseStorage";
import { useAuth } from '@hooks/auth';


export default function Home(): ReactElement {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('')
  const navigation = useNavigation()

  const { COLORS } = useTheme()
  
  const { signOut, user } = useAuth()

  function getAllPizzas(value: string) {

    const formattedValue = value.toLocaleLowerCase().trim()

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[]

        setPizzas(data)
      })
      .catch((error) => getStorageErrorMessageFromErrorCode(error.code))
  }

  function handleNavigateToProduct(id: string) {
    const redirect = user?.isAdmin ? 'Product' : 'Order'

    navigation.navigate(redirect, { id })
  }

  function handleSearchPizzas() {
    getAllPizzas(search)
  }

  function handleSearchClearPizzas() {
    setSearch('')
    getAllPizzas('')
  }

  function handleAddNewPizza() {
    navigation.navigate('Product', {})
  }

  useFocusEffect(useCallback(() => {
    getAllPizzas('')
  }, []))

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji}/>
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <BorderlessButton onPress={signOut}>
          <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
        </BorderlessButton>
      </Header>

      <SearchComponent
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearchPizzas}
        onClear={handleSearchClearPizzas}
      />

      <MenuHeader>
        <MenuHeaderTitle>Cardapio</MenuHeaderTitle>
        <MenuItemsCounter>{pizzas.length} pizzas</MenuItemsCounter>
      </MenuHeader>

      <FlatList
        data={pizzas}
        renderItem={({ item }) => (
          <ProductCard
            data={{ id: item.id, name: item.name, description: item.description, photo_url: item.photo_url }}
            onPress={() => handleNavigateToProduct(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      />

      {user?.isAdmin && (
        <NewProductButton
          title='Cadastrar Pizza'
          type='secondary'
          onPress={handleAddNewPizza}
        />
      )}
    </Container>
  );
}
