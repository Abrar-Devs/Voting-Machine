import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from '../screens/loginScreen';
// import Register from '../components/auth/Register';

const Index = () => (
  <SafeAreaProvider>
    <Login />
  </SafeAreaProvider>
);

export default Index;
