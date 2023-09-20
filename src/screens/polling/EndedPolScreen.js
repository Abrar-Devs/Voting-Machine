import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { getEndedElections } from '../../utils/helpers'
import ScreenComponent from '../../components/polling/ScreenComponent'
import ElectionResultScreen from './ElectionResultScreen'

const Stack = createNativeStackNavigator()

const EndedPolScreen = ({ navigation }) => {
  const btnHandler = election => {
    navigation.navigate('ElectionResultScreen', { election })
  }

  return (
    <ScreenComponent
      title={'Finished Elections'}
      filterElections={getEndedElections}
      btnTitle={'View Result'}
      btnHandler={btnHandler}
    />
  )
}

const Navigator = () => (
  <Stack.Navigator initialRouteName='EndedPolScreen' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='EndedPolScreen' component={EndedPolScreen} />
    <Stack.Screen name='ElectionResultScreen' component={ElectionResultScreen} />
  </Stack.Navigator>
)

export default Navigator
