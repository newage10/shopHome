import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import RegisterScreen from './RegisterScreen'
import { getStorage } from '~/helper/methods'
import SCREENS from '../constant/screens'
import React, { useEffect } from 'react'
import HomeScreen from './HomeScreen'
import CartScreen from './CartScreen'

const Stack = createNativeStackNavigator()
const stackOptions = {
  headerShown: false,
  keyboardHandlingEnabled: true,
  headerVisible: false,
  gesturesEnabled: true,
}

const ScreensContainer = () => {
  const getData = async () => {
    const result = await getStorage('userData')
    return result
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={stackOptions}
        initialRouteName={SCREENS.REGISTER}
      >
        <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Stack.Screen name={SCREENS.CART} component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ScreensContainer
