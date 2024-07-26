import {
  formatAccountNumber,
  isEmptyObj,
  isEmptyParam,
  responsiveFontSizeOS,
  responsiveSizeOS,
} from '~/helper/GeneralMain'
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationContext, StackActions } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { getStorage, setStorage } from '~/helper/methods'
import FastImage from 'react-native-fast-image'
import SCREENS from '../constant/screens'
import Layout from '~/components/Layout'
import Colors from '@themes/colors'
import images from '@themes/images'

const RegisterScreen = () => {
  const navigation = React.useContext(NavigationContext)
  const [fullName, setFullName] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [email, setEmail] = useState(null)
  const [address, setAddress] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [isSubmit, setCheckSubmit] = useState(false)
  const [privacyPolicyOption, setPrivacyPolicyOption] = useState(false)

  const handleSetData = useCallback((data, key) => {
    switch (key) {
      case paramRegister.fullName:
        setFullName(data)
        break
      case paramRegister.phoneNumber:
        const iPhoneNumber = formatAccountNumber(data)
        setPhoneNumber(iPhoneNumber)
        break
      case paramRegister.email:
        setEmail(data)
        break
      case paramRegister.address:
        setAddress(data)
        break
      case paramRegister.birthday:
        setBirthday(data)
        break
      default:
        break
    }
  }, [])

  const handleSelectOption = useCallback(() => {
    setPrivacyPolicyOption(!privacyPolicyOption)
  }, [privacyPolicyOption])

  const handleRegister = useCallback(async () => {
    try {
      const userData = {
        phoneNo: phoneNumber,
        fullname: fullName,
        email: email,
        address: address,
        birthday: birthday,
      }
      if (isSubmit) {
        await setStorage('userInfo', userData)
        navigation.dispatch(StackActions.replace(SCREENS.HOME))
      } else {
        Alert.alert('Thông báo', 'Đăng ký thất bại. Vui lòng kiểm tra lại.')
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Lỗi kết nối mạng hoặc máy chủ.')
    }
  }, [phoneNumber, fullName, email, address, birthday, isSubmit])

  const checkUserInfo = useCallback(async () => {
    const userInfo = await getStorage('userInfo')
    !isEmptyObj(userInfo) && !isEmptyParam(userInfo?.phoneNo)
      ? navigation.dispatch(StackActions.replace(SCREENS.HOME))
      : null
  }, [])

  useEffect(() => {
    checkUserInfo()
  }, [])

  useEffect(() => {
    if (
      !isEmptyParam(fullName) &&
      !isEmptyParam(phoneNumber) &&
      !isEmptyParam(email) &&
      !isEmptyParam(address) &&
      !isEmptyParam(birthday) &&
      privacyPolicyOption
    ) {
      setCheckSubmit(true)
    } else {
      setCheckSubmit(false)
    }
  }, [fullName, phoneNumber, email, address, birthday, privacyPolicyOption])

  return (
    <Layout style={styles.viewContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <FastImage
          source={images.icLogo}
          style={styles.imgLogo}
          resizeMode="contain"
        />
        <Text style={styles.txtTitle}>{'Sign Up'}</Text>
        <View style={styles.viewContent}>
          <View style={styles.viewInput}>
            <TextInput
              value={fullName}
              onChangeText={(e) => handleSetData(e, paramRegister.fullName)}
              style={styles.viewInputText}
              placeholder="Họ tên"
              autoCorrect={false}
              maxLength={100}
              allowFontScaling={false}
              keyboardType="default"
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              value={phoneNumber}
              onChangeText={(e) => handleSetData(e, paramRegister.phoneNumber)}
              style={styles.viewInputText}
              placeholder="Số điện thoại"
              autoCorrect={false}
              maxLength={10}
              allowFontScaling={false}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              value={email}
              onChangeText={(e) => handleSetData(e, paramRegister.email)}
              style={styles.viewInputText}
              placeholder="Email"
              autoCorrect={false}
              maxLength={30}
              allowFontScaling={false}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              value={address}
              onChangeText={(e) => handleSetData(e, paramRegister.address)}
              style={styles.viewInputText}
              placeholder="Địa chỉ"
              autoCorrect={false}
              maxLength={100}
              allowFontScaling={false}
              keyboardType="default"
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              value={birthday}
              onChangeText={(e) => handleSetData(e, paramRegister.birthday)}
              style={styles.viewInputText}
              placeholder="Ngày sinh"
              autoCorrect={false}
              maxLength={100}
              allowFontScaling={false}
              keyboardType="default"
            />
          </View>
          <View style={styles.viewSelectOption}>
            <TouchableOpacity
              style={styles.btnSelectOption}
              onPress={handleSelectOption}
            >
              <FastImage
                source={
                  privacyPolicyOption ? images.icCheckbox : images.icUnCheckbox
                }
                style={styles.imgSelectOption}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={styles.txtSelectOption}
            >{`Bằng việc bạn chọn tạo hồ sơ, bạn đồng ý với Điều khoản sử dụng của App.`}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.btnSubmit,
              !isSubmit ? styles.btnSubmit_Disabled : null,
            ]}
            disabled={isSubmit ? false : true}
            onPress={handleRegister}
          >
            <Text style={styles.txtSubmit}>Tạo hồ sơ khách hàng</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Layout>
  )
}

export default RegisterScreen

const paramRegister = {
  fullName: 'fullName',
  phoneNumber: 'phoneNumber',
  email: 'email',
  address: 'address',
  birthday: 'birthday',
  licensePlate: 'licensePlate',
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.bgWhite2,
    paddingHorizontal: responsiveSizeOS(16),
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: responsiveFontSizeOS(24),
    color: Colors.txtBlack,
    fontWeight: 'bold',
    marginTop: responsiveSizeOS(5),
  },
  viewContent: {
    width: '100%',
    marginTop: responsiveSizeOS(12),
    marginBottom: responsiveSizeOS(4),
  },
  viewText: {
    width: '100%',
    height: responsiveSizeOS(16),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  txtForgotPass: {
    fontSize: responsiveFontSizeOS(14),
    color: Colors.txtBlack,
  },
  viewInput: {
    width: '100%',
    height: responsiveSizeOS(44),
    borderWidth: responsiveSizeOS(1),
    borderColor: Colors.borderInput,
    borderRadius: responsiveSizeOS(20),
    marginBottom: responsiveSizeOS(20),
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: responsiveSizeOS(16),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewInputText: {
    width: '100%',
    fontSize: responsiveFontSizeOS(20),
    color: Colors.txtBlack,
  },
  viewSelectOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: responsiveSizeOS(8),
  },
  btnSelectOption: {
    width: responsiveSizeOS(20),
    height: responsiveSizeOS(20),
  },
  imgSelectOption: {
    width: responsiveSizeOS(20),
    height: responsiveSizeOS(20),
  },
  txtSelectOption: {
    fontSize: responsiveFontSizeOS(13),
    color: 'rgb(28, 28, 28)',
    marginLeft: responsiveSizeOS(10),
    textAlign: 'left',
  },
  btnSubmit: {
    backgroundColor: Colors.btnSubmit,
    height: responsiveSizeOS(50),
    width: '100%',
    borderRadius: responsiveSizeOS(20),
    marginTop: responsiveSizeOS(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSubmit_Disabled: {
    backgroundColor: Colors.bgGray,
  },
  txtSubmit: {
    color: Colors.txtWhite,
    fontSize: responsiveFontSizeOS(20),
    fontWeight: 'bold',
  },
  viewQuestion: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: responsiveSizeOS(20),
  },
  txtQuestion: {
    fontSize: responsiveFontSizeOS(16),
    color: Colors.txtBlack,
  },
  txtLogin: {
    fontSize: responsiveFontSizeOS(16),
    color: Colors.txtGreen,
    fontWeight: 'bold',
  },
  imgLogo: {
    width: responsiveSizeOS(100),
    height: responsiveSizeOS(100),
    resizeMode: 'contain',
  },
})
