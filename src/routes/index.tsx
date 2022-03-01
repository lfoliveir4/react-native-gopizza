import React, { ReactElement } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth, AuthProvider } from '@hooks/auth'
import SignIn from "@screens/SignIn";

import UserStackRoutes from './user.stack.routes';


export default function Routes(): ReactElement {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  ) 
}
