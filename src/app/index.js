import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from '../screens/register';

const Index = () => (
  <SafeAreaProvider>
    <Login />
  </SafeAreaProvider>
);

export default Index;
