import * as types from './product.types'

export const addProductCart = (payload, callback) => ({
  type: types.ADD_PRODUCT_CART,
  payload,
  callback,
})

export const removeProductCart = (payload, callback) => ({
  type: types.REMOVE_PRODUCT_CART,
  payload,
  callback,
})

export const createProductTotal = (payload, callback) => ({
  type: types.CREATE_PRODUCT_TOTAL,
  payload,
  callback,
})
