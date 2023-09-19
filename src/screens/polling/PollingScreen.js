import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ActivePolScreen from './ActivePolScreen';
import ComingPolScreen from './ComingPolScreen';
import EndedPolScreen from './EndedPolScreen';
import {
  getAllElections,
  getConstitutionCandidates,
} from '../../actions/asyncActions';
import {useDispatch} from 'react-redux';

const Tab = createBottomTabNavigator();
//tabBarIconStyle: {display: 'none'}
function PollingScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('in polling screen useeffect: ');
    dispatch(getConstitutionCandidates());
    dispatch(getAllElections());
  });

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Active" component={ActivePolScreen} />
      <Tab.Screen name="Coming Up" component={ComingPolScreen} />
      <Tab.Screen name="Ended" component={EndedPolScreen} />
    </Tab.Navigator>
  );
}

export default PollingScreen;
