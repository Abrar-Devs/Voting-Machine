import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import {getAllConstitutions, checkSession} from '../actions/asyncActions';
import LoadingScreen from '../screens/LoadingScreen';
import Dashboard from './Dashboard';
const StackNav = createNativeStackNavigator();

const AuthApp = () => {
  const currentUser = useSelector(state => state.user);
  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
    dispatch(getAllConstitutions());
  }, []);
  console.log('deedsa');

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
