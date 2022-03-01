import React, { ReactElement, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore'

import BottomTabs from "@components/BottomTabs";

import Home from '@screens/Home'
import Orders from '@screens/Orders'

const Tab = createBottomTabNavigator();

export default function UserTabRoutes(): ReactElement {
  const { COLORS } = useTheme()
  const [ordersCounter, setOrdersCounter] = useState('0')

  useEffect(() => {
    const subscribe = firestore()
    .collection('order')
    .where('status', '==', 'Pronto')
    .onSnapshot(querySnapshop => setOrdersCounter(String(querySnapshop.docs.length)))

    return () => subscribe()    
  }, []);


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
        }
    }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (<BottomTabs title='Cardapio' color={color} />)
        }}
      />
      <Tab.Screen
        name='Orders'
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomTabs 
              title='Pedidos' 
              color={color} 
              notifications={ordersCounter} 
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
