import React, {useEffect} from 'react';
import {Button} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {userScreensList, adminScreenList} from './screenList';
import {
  getCandidateApplications,
  getCandidateProfile,
  getAllElections,
  firebaseLogout,
} from '../../actions/asyncActions';

const Drawer = createDrawerNavigator();

export default function App() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.isAdmin);

  const screenList = isAdmin ? adminScreenList : userScreensList;

  useEffect(() => {
    if (isAdmin) {
      dispatch(getCandidateApplications());
    }
    dispatch(getCandidateProfile());
    dispatch(getAllElections());
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
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

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        title="Logout"
        onPress={() => {
          props.navigation.closeDrawer();
          dispatch(firebaseLogout());
        }}
      />
    </DrawerContentScrollView>
  );
};
