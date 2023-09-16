import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {auth} from '../../config/firebase';
import {userScreensList, adminScreenList} from './screenList';
import {
  getCandidateApplications,
  getCandidateProfile,
} from '../../actions/asyncActions';

const Drawer = createDrawerNavigator();

export default function App() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.isAdmin);

  const screenList = isAdmin ? adminScreenList : userScreensList;

  useEffect(() => {
    if (isAdmin) dispatch(getCandidateApplications());
    dispatch(getCandidateProfile());
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {screenList.map(item => (
          <Drawer.Screen
            key={item.key}
            name={item.name}
            component={item.comp}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
