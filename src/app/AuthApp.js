import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import {getAllConstitutions} from '../features/user/userSlice';
import UserProfileScreen from '../screens/UserProfileScreen';

const StackNav = createNativeStackNavigator();

const AuthApp = () => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConstitutions());
  }, []);

  if (currentUser) return <UserProfileScreen />;

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
