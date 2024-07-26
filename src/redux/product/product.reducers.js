import * as types from './product.types'

const initialState = {
  resProductCart: [],
  isLoadingAddProductCart: false,
  resProductTotal: [],
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PRODUCT_CART:
      let productData = [...state?.resProductCart] ?? []
      const productItem = action?.payload ?? {}
      const productIndex = productData.findIndex(
        (items) => items.productId === productItem?.productId,
      )
      if (productIndex !== -1) {
        productData[productIndex].quantity += 1
      } else {
        productData = [...productData, { ...action?.payload, quantity: 1 }]
      }
      return {
        ...state,
        isLoadingAddProductCart: true,
        resProductCart: productData,
      }
    case types.ADD_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        isLoadingAddProductCart: false,
        resProductCart: action?.payload,
      }
    case types.ADD_PRODUCT_CART_FAIL:
      return {
        ...state,
        isLoadingAddProductCart: false,
        resProductCart: action?.payload,
      }
    case types.REMOVE_PRODUCT_CART:
      const { productId } = action?.payload ?? {}
      const newData = state?.resProductCart.filter(
        (item) => item.productId !== productId,
      )
      return {
        ...state,
        resProductCart: newData,
      }
    case types.CREATE_PRODUCT_TOTAL:
      return {
        ...state,
        resProductTotal: action?.payload,
      }
    case types.PLUS_QUANTITY_PRODUCT:
      const itemIndex = [...state?.resProductCart].findIndex(
        (items) => items.productId === action?.payload?.productId,
      )
      if (itemIndex !== -1) {
        ;[...state?.resProductCart][itemIndex].quantity += 1
      }
      return {
        ...state,
        resProductCart: [...state?.resProductCart],
      }
    case types.MINUS_QUANTITY_PRODUCT:
      return {
        ...state,
      }
    default:
      return state
  }
}
