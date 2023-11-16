import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';

import AuthApp from './AuthApp';
import {store} from './store';

const Index = () => (
  <SafeAreaProvider>
    <ToastProvider>
      <Provider store={store}>
        <AuthApp />
      </Provider>
    </ToastProvider>
  </SafeAreaProvider>
);

export default Index;
