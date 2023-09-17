import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import AuthApp from './AuthApp';
import {store} from './store';

const Index = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <AuthApp />
    </Provider>
  </SafeAreaProvider>
);

export default Index;
