import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native'
import React from 'react'

const Footer = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : props.behavior || null}
    >
      <View
        style={[
          props.disableShadow ? {} : styles.container,
          props?.containerStyle,
          { backgroundColor: props?.backgroundColor ?? 'transparent' },
        ]}
      >
        {props?.children}
      </View>
      <SafeAreaView
        style={{
          backgroundColor: props?.backgroundColor ?? 'transparent',
        }}
      />
    </KeyboardAvoidingView>
  )
}

export default React.memo(Footer)

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
})
