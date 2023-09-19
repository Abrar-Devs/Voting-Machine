import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './Dashboard';
import {
  getAllConstitutions,
  checkSession,
  initApp,
} from '../actions/asyncActions';
import LoginScreen from '../screens/auth/loginScreen';
import LoadingScreen from '../screens/common/LoadingScreen';
import RegisterScreen from '../screens/auth/registerScreen';

const StackNav = createNativeStackNavigator();

const AuthApp = () => {
  const currentUser = useSelector(state => state.user);
  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
    setTimeout(() => {
      dispatch(checkSession());
    }, 3000);
    dispatch(getAllConstitutions());
  }, []);

  if (loading) return <LoadingScreen />;
  if (currentUser) return <Dashboard />;

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Login">
        <StackNav.Screen name="Login" component={LoginScreen} />
        <StackNav.Screen name="Register" component={RegisterScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default AuthApp;
