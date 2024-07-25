import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  responsiveFontSizeOS,
  responsiveSizeOS,
  SCREEN_WIDTH,
} from '~/helper/GeneralMain'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { removeProductCart } from '~/redux/product/product.actions'
import { useAppDispatch, useAppSelector } from '~/configs/hooks'
import { createSelector } from '@reduxjs/toolkit'
import FastImage from 'react-native-fast-image'
import Layout from '~/components/Layout'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import translates from '~/translates'
import Colors from '~/themes/colors'
import images from '~/themes/images'

const selectProductStore = (state) => state?.productReducer?.resProductCart

const productSelector = createSelector(
  [selectProductStore],
  (resProductCart) => {
    return {
      resProductCart,
    }
  },
)

const CartScreen = () => {
  const dispatch = useAppDispatch()

  const { resProductCart } = useAppSelector((state) => productSelector(state))

  const memoizedData = useMemo(() => resProductCart, [resProductCart])

  const keyExtractor = useCallback((item, index) => item.productId + index, [])

  const getItemLayout = useCallback(
    (data, index) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    [],
  )

  const updateQuantily = useCallback((item) => {}, [])

  const handleQuantityNext = useCallback(() => {}, [])

  const handleQuantityPrev = useCallback(() => {}, [])

  const handleRemoveProduct = useCallback(
    (item) => () => {
      Alert.alert(
        'Thông báo',
        `Bạn muốn xoá sản phẩm trong giỏ hàng?`,
        [
          { text: 'Không', style: 'cancel' },
          {
            text: 'Xác nhận',
            onPress: () => dispatch(removeProductCart(item)),
          },
        ],
        { cancelable: true },
      )
    },
    [],
  )

  const handleTotalPrice = useMemo(() => {
    const result = resProductCart.reduce(
      (total, item) =>
        total +
        item?.productCost * item?.quantity +
        (item?.productCost * item?.productTax * item?.quantity) / 100,
      0,
    )
    return parseInt(result)
  }, [resProductCart])

  const renderItem = useCallback(({ item }) => <ProductItem item={item} />, [])

  const ProductItem = React.memo(({ item }) => (
    <View style={styles.viewContentItem}>
      <View style={styles.viewItem}>
        <FastImage
          source={{ uri: item?.productImages?.[0] }}
          style={styles.imageItem}
          resizeMode="contain"
        />
        <View style={styles.viewRightItem}>
          <Text style={styles.txtName} numberOfLines={1} ellipsizeMode="tail">
            {item?.productName}
          </Text>
          <Text
            style={styles.txtDesc}
            numberOfLines={2}
            ellipsizeMode="tail"
          >{`Description:  ${item?.productDesc}`}</Text>
          <Text
            style={styles.txtDefault}
          >{`Cost: ${item?.productCost} $`}</Text>
          <Text style={styles.txtDefault}>{`Tax: ${item?.productTax} %`}</Text>
        </View>
      </View>
      <View style={styles.viewBottomItem}>
        <View style={styles.viewBottomLeft}>
          <TouchableOpacity
            style={styles.viewMinusPlus}
            onPress={handleQuantityNext}
          >
            <FastImage
              source={images.icMinus}
              style={styles.imgAcc}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput
            value={item?.quantity?.toString() ?? '1'}
            onChangeText={(e) => updateQuantily(e)}
            style={styles.viewInputText}
            placeholder="1"
            autoCorrect={false}
            maxLength={10}
            allowFontScaling={false}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.viewMinusPlus}
            onPress={handleQuantityPrev}
          >
            <FastImage
              source={images.icPlus}
              style={styles.imgAcc}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnDeleteProduct}
          onPress={handleRemoveProduct(item)}
        >
          <Text style={styles.txtDeleteProduct}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  ))

  return (
    <Layout style={styles.container}>
      <Header barStyle="dark-content" title={translates.productDetailTitle} />
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContent}>
          <FlatList
            data={memoizedData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={50}
            windowSize={21}
            numColumns={1}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <Footer disableShadown backgroundColor={Colors.bgWhite2}>
        <View style={styles.viewPayment}>
          <Text
            style={styles.txtPrice}
          >{`Total Price: ${handleTotalPrice} USD`}</Text>
          <TouchableOpacity style={styles.btnPayment}>
            <Text style={styles.txtPayment}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </Footer>
    </Layout>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  viewContentItem: {
    width: '100%',
    backgroundColor: Colors.bgWhite2,
    borderWidth: responsiveSizeOS(0.5),
    borderColor: Colors.bgGray,
    paddingHorizontal: responsiveSizeOS(8),
    paddingVertical: responsiveSizeOS(4),
    marginBottom: responsiveSizeOS(4),
  },
  contentScrollView: {
    paddingBottom: responsiveSizeOS(50),
    paddingHorizontal: responsiveSizeOS(15),
  },
  viewContent: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
  },
  viewFlatItem: {
    width: '100%',
    backgroundColor: 'red',
  },
  viewInputButton: {
    width: SCREEN_WIDTH - responsiveSizeOS(30),
    alignSelf: 'center',
  },
  viewInputButtonText: {
    fontSize: responsiveFontSizeOS(16),
    color: Colors.txtWhite,
    textTransform: 'uppercase',
  },
  viewItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  viewItemTwo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'green',
  },
  viewRightItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: responsiveSizeOS(12),
    paddingTop: responsiveSizeOS(12),
  },
  imageItem: {
    width: responsiveSizeOS(100),
    height: responsiveSizeOS(100),
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    borderRadius: responsiveSizeOS(20),
  },
  txtName: {
    color: Colors.txtBlack,
    fontSize: responsiveFontSizeOS(12),
    textTransform: 'capitalize',
    marginTop: responsiveSizeOS(2),
  },
  txtDesc: {
    color: Colors.txtBlack,
    fontSize: responsiveFontSizeOS(10),
    marginTop: responsiveSizeOS(2),
    width: '35%',
  },
  txtDefault: {
    color: Colors.txtBlack,
    fontSize: responsiveFontSizeOS(10),
    marginTop: responsiveSizeOS(2),
  },
  txtExpand: {
    color: Colors.txtBlue,
    fontSize: responsiveFontSizeOS(10),
    marginTop: responsiveSizeOS(2),
  },
  viewBottomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBottomLeft: {
    width: responsiveSizeOS(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgAcc: {
    width: responsiveSizeOS(22),
    height: responsiveSizeOS(22),
    resizeMode: 'contain',
  },
  viewMinusPlus: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNumberRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewInputQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: responsiveSizeOS(0.5),
    borderColor: 'rgb(203, 203, 203)',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: responsiveSizeOS(15),
    borderRadius: responsiveSizeOS(15),
    height: responsiveSizeOS(44),
    marginTop: responsiveSizeOS(10),
    marginBottom: responsiveSizeOS(10),
  },
  viewInputText: {
    fontSize: responsiveFontSizeOS(16),
    color: 'rgb(11, 11, 11)',
    textAlign: 'center',
    width: responsiveSizeOS(40),
    marginLeft: responsiveSizeOS(5),
    marginRight: responsiveSizeOS(5),
  },
  btnDeleteProduct: {
    paddingVertical: responsiveSizeOS(4),
    paddingHorizontal: responsiveSizeOS(8),
    backgroundColor: '#ff4040',
    borderRadius: responsiveSizeOS(8),
  },
  txtDeleteProduct: {
    color: Colors.txtWhite,
    fontSize: responsiveFontSizeOS(12),
  },
  viewPayment: {
    width: '100%',
    height: responsiveSizeOS(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSizeOS(12),
  },
  btnPayment: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: responsiveSizeOS(12),
    paddingHorizontal: responsiveSizeOS(6),
    paddingVertical: responsiveSizeOS(4),
  },
  txtPayment: {
    color: Colors.txtWhite,
    fontSize: responsiveFontSizeOS(16),
  },
  txtPrice: {
    color: 'black',
    fontSize: responsiveFontSizeOS(16),
  },
})
