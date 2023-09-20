import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar, Divider } from 'react-native-elements'

import TextWithLabel from '../common/TextWithLabel'
import globalStyles from '../../utils/styles/globalstyles'

const UserProfile = () => {
  const user = useSelector(state => state.user)

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.cardView, globalStyles.boxShadow()]}>
        <Avatar
          rounded
          size='xlarge'
          source={{ uri: user.profilePic }}
          containerStyle={styles.avatarContainer}
        />
        <Text style={[styles.username, globalStyles.boldText, globalStyles.txtColor()]}>
          {user.name}
        </Text>
        <Divider style={styles.divider} />
        <TextWithLabel label='Email' text={user.email} textAlign='left' />
        <TextWithLabel label='Constitution' text={user.constitution} textAlign='left' />
        <TextWithLabel label='CNIC' text={user.cnic} textAlign='left' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignSelf: 'center',
  },
  username: {
    textTransform: 'capitalize',
  },
  divider: {
    marginVertical: 10,
  },
})

export default UserProfile
