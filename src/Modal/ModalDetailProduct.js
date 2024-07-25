import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import { responsiveFontSizeOS, responsiveSizeOS } from '~/helper/GeneralMain'
import { useAppDispatch, useAppSelector } from '~/configs/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { HeaderPopup } from '~/components/HeaderPopup'
import Modal from 'react-native-modal'

const ModalDetailProduct = (props) => {
  const {
    modalVisible,
    toggleModalVisible,
    modalTitle,
    productData,
    onPressDelete,
    onPressUpdate,
  } = props ?? {}
  const dispatch = useAppDispatch()
  const [productName, setProductName] = useState(null)
  const [productDesc, setProductDesc] = useState(null)
  const [productCost, setProductCost] = useState(null)
  const [productTax, setProductTax] = useState(null)
  const [isSubmit, setSubmit] = useState(false)

  const handleClose = useCallback(() => {
    toggleModalVisible()
  }, [toggleModalVisible])

  useEffect(() => {
    const { productName, productDesc, productCost, productTax } =
      productData ?? {}
    productName && setProductName(productName)
    productDesc && setProductDesc(productDesc)
    productCost && setProductCost(productCost.toString())
    productTax && setProductTax(productTax.toString())
  }, [productData?.productId])

  const handleRemove = useCallback(() => {
    onPressDelete(productData)()
    handleClose()
  }, [productData])

  return (
    <Modal
      propagateSwipe
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={modalVisible}
      onBackdropPress={() => toggleModalVisible(false)}
      swipeDirection="down"
      style={styles.containerModal}
    >
      <View style={styles.modalView}>
        <HeaderPopup
          onClose={handleClose}
          title={modalTitle}
          styleTitle={styles.fontTitle}
          containerStyle={styles.viewHeader}
          styleButton={styles.styleButton}
        />
        <View style={styles.viewContentMain}>
          <Text style={styles.txtLabelName}>Product Name:</Text>
          <TextInput
            value={productName}
            onChangeText={(e) => setProductName(e)}
            style={styles.viewInputText}
            placeholder="Product Name"
            autoCorrect={false}
            allowFontScaling={false}
            keyboardType="default"
            returnKeyType="done"
          />
          <Text style={styles.txtLabelName}>Product Description</Text>
          <TextInput
            value={productDesc}
            onChangeText={(e) => setProductDesc(e)}
            style={styles.viewInputText}
            placeholder="Product Description"
            autoCorrect={false}
            allowFontScaling={false}
            keyboardType="default"
            returnKeyType="done"
          />
          <Text style={styles.txtLabelName}>Product Cost</Text>
          <TextInput
            value={productCost}
            onChangeText={(e) => setProductCost(e)}
            style={styles.viewInputText}
            placeholder="Product Cost"
            autoCorrect={false}
            allowFontScaling={false}
            keyboardType="number-pad"
            returnKeyType="done"
          />
          <Text style={styles.txtLabelName}>Product Tax</Text>
          <TextInput
            value={productTax}
            onChangeText={(e) => setProductTax(e)}
            style={styles.viewInputText}
            placeholder="Product Tax"
            autoCorrect={false}
            allowFontScaling={false}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </View>
        <View style={styles.viewSubmitRow}>
          <TouchableOpacity style={styles.viewTwoSubmit} onPress={handleRemove}>
            <Text style={styles.txtSubmit}>{'Xoá'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewTwoSubmit,
              !isSubmit ? styles.viewInputButton_Disabled : null,
            ]}
            onPress={onPressUpdate}
            disabled={!isSubmit}
          >
            <Text style={styles.txtSubmit}>{'Cập nhật'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalDetailProduct

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    paddingHorizontal: responsiveSizeOS(16),
    paddingBottom: responsiveSizeOS(40),
    backgroundColor: 'rgba(24, 26, 65, 0.6)',
  },
  modalView: {
    paddingHorizontal: responsiveSizeOS(0),
    paddingBottom: responsiveSizeOS(16),
    backgroundColor: 'rgb(242, 244, 243)',
    borderRadius: responsiveSizeOS(20),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: responsiveSizeOS(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: responsiveSizeOS(4),
    elevation: responsiveSizeOS(5),
  },
  viewSubmitRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  viewTwoSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(224, 39, 41)',
    borderRadius: responsiveSizeOS(15),
    height: responsiveSizeOS(32),
    width: responsiveSizeOS(150),
  },
  txtSubmit: {
    fontSize: responsiveFontSizeOS(15),
    color: 'white',
    textTransform: 'uppercase',
  },
  viewInputText: {
    fontSize: responsiveFontSizeOS(16),
    color: 'rgb(11, 11, 11)',
    textAlign: 'left',
    paddingRight: responsiveSizeOS(16),
    width: '100%',
    height: responsiveSizeOS(40),
    borderWidth: responsiveSizeOS(1),
    borderColor: '#647081',
    borderRadius: responsiveSizeOS(10),
    paddingHorizontal: responsiveSizeOS(10),
    marginTop: responsiveSizeOS(10),
  },
  txtLabelName: {
    fontSize: responsiveFontSizeOS(16),
    color: 'rgb(11, 11, 11)',
    marginTop: responsiveSizeOS(12),
  },
  viewContentMain: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: responsiveSizeOS(16),
    paddingBottom: responsiveSizeOS(16),
  },
  fontTitle: {
    fontSize: responsiveFontSizeOS(15),
    color: 'rgb(11, 11, 11)',
    textTransform: 'uppercase',
  },
  viewHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveSizeOS(10),
    borderBottomWidth: responsiveSizeOS(1),
    borderColor: '#647081',
  },
  imageSelectOption: {
    width: responsiveSizeOS(16),
    height: responsiveSizeOS(16),
  },
  viewComboboxItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: responsiveSizeOS(16),
    borderWidth: responsiveSizeOS(1),
    borderColor: '#647081',
    borderRadius: responsiveSizeOS(10),
    height: responsiveSizeOS(40),
    paddingHorizontal: responsiveSizeOS(10),
    marginTop: responsiveSizeOS(10),
    marginBottom: responsiveSizeOS(12),
  },
  txtTypeItem: {
    fontSize: responsiveFontSizeOS(16),
    color: '#000000',
    paddingRight: responsiveSizeOS(8),
  },
  txtDefautItem: {
    fontSize: responsiveFontSizeOS(16),
    color: '#979797',
    paddingRight: responsiveSizeOS(8),
  },
  txtError: {
    color: 'rgb(202, 15, 20)',
    fontSize: responsiveFontSizeOS(12),
    textAlign: 'left',
    marginLeft: responsiveSizeOS(2),
    marginTop: responsiveSizeOS(2),
  },
  viewInputButton_Disabled: {
    backgroundColor: 'rgb(151, 151, 151)',
  },
  styleButton: {
    right: 0,
    marginRight: responsiveSizeOS(12),
  },
})
