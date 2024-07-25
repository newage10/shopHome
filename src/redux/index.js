import productReducer from './product/product.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  productReducer,
})

export default rootReducer
