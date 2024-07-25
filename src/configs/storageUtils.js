import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token)
  } catch (error) {
    // Xử lý lỗi
  }
}

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken')
    return token
  } catch (error) {
    // Xử lý lỗi
  }
}
