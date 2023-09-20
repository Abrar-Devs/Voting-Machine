import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useToast } from 'react-native-toast-notifications'

import Dashboard from './Dashboard'
import LoginScreen from '../screens/auth/loginScreen'
import RegisterScreen from '../screens/auth/registerScreen'
import LoadingScreen from '../screens/common/LoadingScreen'
import { getAllConstitutions, checkSession, initApp } from '../actions/asyncActions'

const StackNav = createNativeStackNavigator()

const AuthApp = () => {
  const currentUser = useSelector(state => state.user)
  const loading = useSelector(state => state.loading)
  const { showError, message } = useSelector(state => state.error)

  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    dispatch(initApp())
    dispatch(getAllConstitutions())
    setTimeout(() => {
      dispatch(checkSession())
    }, 3000)
  }, [])

  if (loading) return <LoadingScreen />
  if (currentUser) return <Dashboard />
  if (showError) {
    toast.show(message, { placement: 'top', duration: 1000 })
    return
  }

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='Login'>
        <StackNav.Screen name='Login' component={LoginScreen} />
        <StackNav.Screen name='Register' component={RegisterScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  )
}

export default AuthApp
