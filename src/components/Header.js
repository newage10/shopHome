import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native'
import {
  SCREEN_WIDTH,
  responsiveFontSizeOS,
  responsiveSizeOS,
} from '~/helper/GeneralMain'
import { useNavigation } from '@react-navigation/core'
import FastImage from 'react-native-fast-image'
import images from '~/themes/images'
import Colors from '~/themes/colors'
import PropTypes from 'prop-types'
import React from 'react'

const hitSlop = {
  top: responsiveSizeOS(20),
  left: responsiveSizeOS(20),
  right: responsiveSizeOS(20),
  bottom: responsiveSizeOS(20),
}

const Header = (props) => {
  const {
    title,
    onPressRight = null,
    onPressLeft = null,
    imageLeft = null,
    styleLeft = null,
    titleStyle = {},
    imageRight = null,
    styleRight = null,
    barStyle = 'light-content',
    hideBackButton = false,
    cartNoti = null,
  } = props ?? {}
  const navigation = useNavigation()

  return (
    <>
      <SafeAreaView />

      <StatusBar
        barStyle={barStyle || 'light-content'}
        translucent
        backgroundColor="rgba(0,0,0,0.251)"
      />

      <View style={styles.container}>
        <View style={styles.flexBox}>
          {(!hideBackButton || onPressLeft) && (
            <TouchableOpacity
              onPress={onPressLeft || navigation.goBack}
              hitSlop={hitSlop}
            >
              <FastImage
                source={imageLeft || images.icBackWhite}
                style={styleLeft || styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          <Text style={[styles.text, titleStyle]}>{title}</Text>
        </View>

        <View style={[styles.flexBox, styles.flexEnd]}>
          {onPressRight && (
            <TouchableOpacity onPress={onPressRight} hitSlop={hitSlop}>
              <FastImage
                source={imageRight || images.icCloseWhite}
                style={styleRight || styles.image}
                resizeMode="contain"
              />
              <View style={styles.viewNotiCart}>
                <Text style={styles.txtNotiCart}>{cartNoti}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  )
}

export default React.memo(Header)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onPressRight: PropTypes.func,
  onPressLeft: PropTypes.func,
  imageLeft: PropTypes.number,
  imageRight: PropTypes.number,
  titleStyle: PropTypes.instanceOf(Object),
  styleRight: PropTypes.instanceOf(Object),
  styleLeft: PropTypes.instanceOf(Object),
  barStyle: PropTypes.string,
  hideBackButton: PropTypes.bool,
  cartNoti: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    paddingHorizontal: responsiveSizeOS(16),
    justifyContent: 'space-between',
    height: responsiveSizeOS(50),
    width: SCREEN_WIDTH,
    backgroundColor: '#088da5',
  },
  flexBox: { flex: 1 },
  center: { flex: 8, alignItems: 'center' },
  flexEnd: { alignItems: 'flex-end' },
  text: {
    fontSize: responsiveFontSizeOS(16),
    color: 'white',
  },
  image: {
    width: responsiveSizeOS(18),
    height: responsiveSizeOS(18),
  },
  viewNotiCart: {
    position: 'absolute',
    right: responsiveSizeOS(-10),
    top: responsiveSizeOS(-10),
    width: responsiveSizeOS(18),
    borderWidth: responsiveSizeOS(0.5),
    borderRadius: responsiveSizeOS(12),
    borderColor: Colors.bgWhite2,
    backgroundColor: Colors.bgWhite2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNotiCart: {
    color: 'red',
    fontSize: responsiveFontSizeOS(12),
    textAlign: 'center',
  },
})
