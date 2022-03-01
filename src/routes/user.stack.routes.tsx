import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@screens/Home'
import Product from '@screens/Product'
import Order from '@screens/Order'

import { useAuth } from '@hooks/auth'

import UserTabRoutes from './user.tab.routes';

const Stack = createNativeStackNavigator();

export default function UserRoutes(): ReactElement {
  const { user } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
          <Stack.Group>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Product" component={Product}/>    
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="UserTabRoutes" component={UserTabRoutes}/>
            <Stack.Screen name="Order" component={Order}/>    
          </Stack.Group>
      )}
    </Stack.Navigator>
  );
}