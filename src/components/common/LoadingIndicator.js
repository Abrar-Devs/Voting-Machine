import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

import globalStyles from '../../utils/styles/globalstyles'

const LoadingIndicator = ({ message = 'Loading...' }) => (
  <View style={[globalStyles.container]}>
    <Text style={globalStyles.label}>{message}</Text>
    <ActivityIndicator size='large' color='#007acc' />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default LoadingIndicator
