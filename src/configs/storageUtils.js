import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token)
  } catch (error) {
    console.log('Error storeToken: ', error)
  }
}

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken')
    return token
  } catch (error) {
    console.log('Error getToken: ', error)
  }
}
