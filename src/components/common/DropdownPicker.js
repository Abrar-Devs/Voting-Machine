import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import globalStyles from '../../utils/styles/globalstyles'

const DropdownPicker = ({ label, items, selectedValue, onValueChange }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={globalStyles.input}>
      {items.map((item, index) => (
        <Picker.Item key={index} label={item.name} value={item.name} />
      ))}
    </Picker>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#007acc',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
})

export default DropdownPicker
