import EncryptedStorage from 'react-native-encrypted-storage'

export const handleError = (error) => {
  if (__DEV__) {
    console.log('error at BaseStore handleError', error)
  }
}

export const setStorage = async (key, value) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    handleError(error)
  }
}

export const getStorage = async (key) => {
  try {
    const data = await EncryptedStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
  } catch (error) {
    handleError(error)
  }
}

export const removeStorage = async (key) => {
  try {
    await EncryptedStorage.removeItem(key)
  } catch (error) {
    handleError(error)
  }
}
