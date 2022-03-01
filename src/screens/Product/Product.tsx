import React, {ReactElement, useEffect, useState} from 'react';
import {Platform, TouchableOpacity, ScrollView, Alert, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage'
import {useRoute, useNavigation} from '@react-navigation/native'
import {ProductNavigationProps} from '../../@types/navigation'

import ButtonBack from '@components/ButtonBack'
import Photo from '@components/Photo'
import InputPrice from '@components/InputPrice'
import Input from '@components/Input'
import Button from '@components/Button'

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCaracters,
  Form
} from './styles'
import {ProductProps} from "@components/ProductCard/ProductCard";

type PizzaResponse = ProductProps & {
  photo_path: string
  prices_sizes: {
    p: string
    m: string
    g: string
  }
}

export default function Product(): ReactElement {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceSizeP, setPriceSizeP] = useState('')
  const [priceSizeM, setPriceSizeM] = useState('')
  const [priceSizeG, setPriceSizeG] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [photoPath, setPhotoPath] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const {id} = route.params as ProductNavigationProps

  async function handleImagePicker() {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })

      if (!result.cancelled) {
        setImage(result.uri)
      }
    }
  }

  async function handleAddPizza() {
    if (!name.trim()) {
      return Alert.alert('Cadastro de pizza', 'Informe da pizza')
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro de pizza', 'Informe a descrição da pizza')
    }

    if (!image) {
      return Alert.alert('Cadastro de pizza', 'Informe selecione a image da pizza')
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert('Cadastro de pizza', 'Informe o preço de todos os tamanhos da pizza')
    }

    setIsLoading(true)

    const fileName = new Date().getTime()
    const referenceImage = storage().ref(`/pizzas/${fileName}.png`)

    await referenceImage.putFile(image)

    const photo_url = await referenceImage.getDownloadURL()

    const data = {
      name,
      name_insensitive: name.toLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG
      },
      photo_url,
      photo_path: referenceImage.fullPath
    }

    firestore()
      .collection('pizzas')
      .add(data)
      .then(() => Alert.alert("Cadastro de pizza", 'Cadastro realizado com sucesso'))
      .then(() => navigation.navigate('Home'))
      .catch(() => {
        setIsLoading(false)
        Alert.alert("Cadastro de pizza", 'Não foi possivel cadastrar pizza')
      })
  }

  function handleFetchPizzaDetails(id: string) {
    firestore()
      .collection('pizzas')
      .doc(id)
      .get()
      .then(response => {

        const product = response.data() as PizzaResponse

        setName(product.name)
        setImage(product.photo_url)
        setDescription(product.description)
        setPriceSizeP(product.prices_sizes.p)
        setPriceSizeM(product.prices_sizes.m)
        setPriceSizeG(product.prices_sizes.g)
        setPhotoPath(product.photo_path)
      })
  }

  function handleDeletePizza() {
    firestore()
      .collection('pizzas')
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate("Home"))
      })
  }

  useEffect(() => {
    if (id) {
      handleFetchPizzaDetails(id)
    }
  }, [id])


  return (
    <Container behavior={Platform.OS === "ios" ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={() => navigation.goBack()}/>
          <Title>Cadastrar</Title>
          <TouchableOpacity onPress={handleDeletePizza}>
            {id ? <DeleteLabel>Deletar</DeleteLabel> : <View style={{ width: 20 }} />}
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image}/>
          {!id && (
            <PickImageButton
              title='Carregar'
              type='secondary'
              onPress={handleImagePicker}
            />
          )}

        </Upload>

        <Form>

          <InputGroup>
            <Label>Nome</Label>
            <Input
              onChangeText={setName}
              value={name}

            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCaracters>0 de 60 caracteres</MaxCaracters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{height: 80}}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              value={priceSizeP}
              onChangeText={setPriceSizeP}
              size='P'
            />

            <InputPrice
              value={priceSizeM}
              onChangeText={setPriceSizeM}
              size='M'
            />

            <InputPrice
              value={priceSizeG}
              onChangeText={setPriceSizeG}
              size='G'
            />
          </InputGroup>

          {!id && (
            <Button
              isLoading={isLoading}
              title='Cadastrar Pizza'
              onPress={handleAddPizza}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}
