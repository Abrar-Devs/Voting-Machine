import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from '../screens/register';

const Index = () => {
  return (
    <SafeAreaProvider>
      <Login />
    </SafeAreaProvider>
  );
};

export default Index;
