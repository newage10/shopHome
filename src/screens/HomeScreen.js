import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  ITEM_HEIGHT,
  removeAccents,
  responsiveFontSizeOS,
  responsiveSizeOS,
  SCREEN_WIDTH,
} from '~/helper/GeneralMain'
import {
  addProductCart,
  createProductTotal,
} from '~/redux/product/product.actions'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/configs/hooks'
import { NavigationContext } from '@react-navigation/native'
import ModalDetailProduct from '~/Modal/ModalDetailProduct'
import { generateProductData } from '~/data/productData'
import useToggleState from '~/hooks/useToggleState'
import { createSelector } from '@reduxjs/toolkit'
import FastImage from 'react-native-fast-image'
import Layout from '~/components/Layout'
import Header from '~/components/Header'
import SCREENS from '~/constant/screens'
import Colors from '~/themes/colors'
import images from '~/themes/images'

const selectProductCart = (state) => state?.productReducer?.resProductCart ?? []

const selectProductTotal = (state) =>
  state?.productReducer?.resProductTotal ?? []

const productSelector = createSelector(
  [selectProductCart, selectProductTotal],
  (resProductCart, resProductTotal) => {
    return {
      resProductCart,
      resProductTotal,
    }
  },
)

const HomeScreen = () => {
  const { resProductCart, resProductTotal } = useAppSelector((state) =>
    productSelector(state),
  )
  const navigation = React.useContext(NavigationContext)
  const dispatch = useAppDispatch()
  const [productList, setProductList] = useState([])
  const [productDetail, setProductDetail] = useState(null)
  const [findWord, setFindWord] = useState(null)
  const [changeDetailVisible, toggleChangeDetailVisible] = useToggleState(false)

  const handleSelectCart = useCallback(
    (items) => () => {
      dispatch(addProductCart(items))
    },
    [],
  )

  const openProductDetail = useCallback((item) => {
    setProductDetail(item)
    toggleChangeDetailVisible()
  }, [])

  const renderItem = useCallback(({ item }) => <ProductItem item={item} />, [])

  const keyExtractor = useCallback((item) => item.productId, [])

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  )

  const memoizedData = useMemo(() => productList, [productList])

  const handleWarningRemove = useCallback(
    (item) => () => {
      Alert.alert(
        'Thông báo',
        `Bạn muốn xoá sản phẩm ?`,
        [
          { text: 'Không', style: 'cancel' },
          { text: 'Xác nhận', onPress: handleRemoveProduct(item) },
        ],
        { cancelable: true },
      )
    },
    [],
  )

  const handleRemoveProduct = useCallback(
    (item) => () => {
      setProductList((prevList) =>
        prevList.filter((items) => items.productId !== item.productId),
      )
    },
    [],
  )

  const handleClear = useCallback(() => {
    setFindWord(null)
    setProductList(resProductTotal)
  }, [resProductTotal])

  const handleFindProduct = useCallback(
    (text) => {
      const searchWord = removeAccents(text?.trim()?.toLowerCase())
      const filterData = resProductTotal.filter((item) =>
        removeAccents(
          (
            item.productName +
            item.productDesc +
            item.productCost
          ).toLowerCase(),
        ).includes(searchWord),
      )
      setProductList(filterData)
      setFindWord(text)
    },
    [resProductTotal],
  )

  const getProductDataList = useCallback(() => {
    const productData = generateProductData(1000)
    dispatch(createProductTotal(productData))
  }, [])

  const handleQuantityTotal = useMemo(
    () =>
      resProductCart.reduce((total, item) => total + item?.quantity ?? 0, 0),
    [resProductCart],
  )

  const ProductItem = React.memo(({ item }) => (
    <View style={styles.viewItem}>
      <FastImage
        source={{ uri: item?.productImages?.[0] }}
        style={styles.imageItem}
        resizeMode="contain"
      />
      <Text style={styles.txtName} numberOfLines={1} ellipsizeMode="tail">
        {item?.productName}
      </Text>
      <Text
        style={styles.txtDesc}
        numberOfLines={2}
        ellipsizeMode="tail"
      >{`Description:  ${item?.productDesc}`}</Text>
      <Text style={styles.txtDefault}>{`Cost: ${item?.productCost} $`}</Text>
      <Text style={styles.txtDefault}>{`Tax: ${item?.productTax} %`}</Text>
      <View style={styles.viewAction}>
        <TouchableOpacity
          style={styles.btnDetail}
          onPress={() => openProductDetail(item)}
        >
          <Text style={styles.txtExpand}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelectCart(item)}>
          <Text style={styles.txtExpand}>Buy</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.viewRemove}
        onPress={handleWarningRemove(item)}
      >
        <FastImage
          source={images.iconCloseRed}
          style={styles.btnClosed}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  ))

  useEffect(() => {
    getProductDataList()
  }, [])

  useEffect(() => {
    setProductList(resProductTotal)
  }, [resProductTotal])

  return (
    <Layout style={styles.container}>
      <Header
        barStyle="dark-content"
        title={'Product List'}
        imageLeft={images.icMenu}
        onPressLeft={() => {}}
        styleLeft={styles.btnMenu}
        imageRight={images.icCartGray}
        onPressRight={() => navigation.navigate(SCREENS.CART)}
        cartNoti={handleQuantityTotal ?? 0}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContent}>
          <View style={[styles.viewSearch]}>
            <TouchableOpacity style={styles.btnSearch}>
              <FastImage
                source={images.icSearch}
                style={styles.imgSearch}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TextInput
              value={findWord}
              onChangeText={(text) => handleFindProduct(text)}
              style={styles.viewInputText}
              placeholder="Search Product"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={handleClear} style={styles.viewClose}>
              <FastImage
                source={images.iconClose}
                style={styles.imgClose}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={getProductDataList}
              />
            }
            data={memoizedData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            initialNumToRender={12}
            maxToRenderPerBatch={11}
            updateCellsBatchingPeriod={50}
            windowSize={21}
            numColumns={3}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <ModalDetailProduct
        modalVisible={changeDetailVisible}
        toggleModalVisible={toggleChangeDetailVisible}
        modalTitle={'Product Detail'}
        productData={productDetail}
        onPressDelete={handleWarningRemove}
      />
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentScrollView: {
    paddingBottom: responsiveSizeOS(50),
    paddingHorizontal: responsiveSizeOS(15),
  },
  viewContent: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
    borderTopLeftRadius: responsiveSizeOS(20),
    borderTopRightRadius: responsiveSizeOS(20),
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
  productList: {
    paddingTop: responsiveSizeOS(5),
  },
  viewItem: {
    width: '33.3%',
    backgroundColor: Colors.bgGrayT,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: responsiveSizeOS(0.5),
    borderColor: Colors.bgGray,
    paddingHorizontal: responsiveSizeOS(2),
    paddingVertical: responsiveSizeOS(8),
  },
  imageItem: {
    width: responsiveSizeOS(100),
    height: responsiveSizeOS(100),
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: responsiveSizeOS(20),
  },
  txtName: {
    color: Colors.txtBlack,
    fontSize: responsiveFontSizeOS(12),
    textTransform: 'capitalize',
    marginTop: responsiveSizeOS(2),
    fontWeight: 'bold',
  },
  txtDesc: {
    color: Colors.txtBlack,
    fontSize: responsiveFontSizeOS(10),
    marginTop: responsiveSizeOS(2),
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
    paddingBottom: responsiveSizeOS(1),
    fontWeight: 'bold',
  },
  btnDetail: {
    backgroundColor: Colors.bgGray,
    borderRadius: responsiveSizeOS(4),
    paddingHorizontal: responsiveSizeOS(2),
    width: responsiveSizeOS(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveSizeOS(4),
  },
  viewAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icCheck: {
    width: responsiveSizeOS(16),
    height: responsiveSizeOS(16),
    resizeMode: 'contain',
  },
  btnClosed: {
    width: responsiveSizeOS(16),
    height: responsiveSizeOS(16),
    resizeMode: 'contain',
  },
  viewClose: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCart: {
    width: responsiveSizeOS(12),
    height: responsiveSizeOS(12),
  },
  viewSearch: {
    height: responsiveSizeOS(45),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSizeOS(8),
    backgroundColor: Colors.bgWhite2,
    borderColor: Colors.bgGrayT,
    borderWidth: responsiveSizeOS(1),
  },
  btnSearch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSearch: {
    width: responsiveSizeOS(16),
    height: responsiveSizeOS(16),
    resizeMode: 'contain',
  },
  viewInputText: {
    fontSize: responsiveFontSizeOS(16),
    color: 'rgb(11, 11, 11)',
    marginLeft: responsiveSizeOS(8),
    textAlign: 'left',
    width: '85%',
  },
  imgClose: {
    width: responsiveSizeOS(16),
    height: responsiveSizeOS(16),
    resizeMode: 'contain',
  },
  viewRemove: {
    position: 'absolute',
    top: responsiveSizeOS(2),
    right: responsiveSizeOS(2),
  },
  btnMenu: {
    width: responsiveSizeOS(30),
    height: responsiveSizeOS(30),
    resizeMode: 'contain',
  },
})
