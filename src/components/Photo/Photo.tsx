import React, { ReactElement } from 'react';


import { Image, PlaceholderImage, PlaceholderTitle } from './styles'

type Props = {
  uri: string | null
}


export default function Photo({ uri }: Props): ReactElement {
  if (uri) {
    return <Image source={{ uri }} />
  }

  return (
    <PlaceholderImage>
      <PlaceholderTitle>Nenhuma foto {'\n'} carregada</PlaceholderTitle>
    </PlaceholderImage>
  )
}