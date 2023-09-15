import React from 'react';
import {View, Text} from 'react-native';

import globalStyles from '../utils/styles/globalstyles';
import {UseSelector, useSelector} from 'react-redux';
const UserProfileScreen = () => {
  const currentUser = useSelector(state => state.user);
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{currentUser.email} name</Text>
    </View>
  );
};

export default UserProfileScreen;
