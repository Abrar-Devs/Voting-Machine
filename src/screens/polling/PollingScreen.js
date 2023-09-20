import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useDispatch } from 'react-redux'

import ActivePolScreen from './ActivePolScreen'
import ComingPolScreen from './ComingPolScreen'
import EndedPolScreen from './EndedPolScreen'
import { getAllElections, getConstitutionCandidates } from '../../actions/asyncActions'

const Tab = createBottomTabNavigator()

const PollingScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConstitutionCandidates())
    dispatch(getAllElections())
  }, [])

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Active' component={ActivePolScreen} />
      <Tab.Screen name='Coming Up' component={ComingPolScreen} />
      <Tab.Screen name='Ended' component={EndedPolScreen} />
    </Tab.Navigator>
  )
}

export default PollingScreen
