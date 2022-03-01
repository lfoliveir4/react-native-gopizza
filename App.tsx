import React from 'react';
import AppLoading from 'expo-app-loading'
import {StatusBar} from 'expo-status-bar'
import {useFonts, DMSans_400Regular} from '@expo-google-fonts/dm-sans'
import {DMSerifDisplay_400Regular} from '@expo-google-fonts/dm-serif-display'
import {ThemeProvider} from 'styled-components/native'
import {NavigationContainer} from '@react-navigation/native'
import theme from './src/theme'

import {AuthProvider} from "@hooks/auth";
import UserStackRoutes from "@routes/user.stack.routes";
import UserTabRoutes from "@routes/user.tab.routes";
import Orders from '@screens/Orders'

import Routes from './src/routes'


export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })


  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' translucent backgroundColor='transparent'/>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
