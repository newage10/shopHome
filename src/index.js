import { store } from './configs/store.config'
import ScreensContainer from './screens'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import React from 'react'

const App = () => {
  return (
    <Provider store={store}>
      <ScreensContainer />
    </Provider>
  )
}

export default App
