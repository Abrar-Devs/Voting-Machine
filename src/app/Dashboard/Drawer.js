import React from 'react';
import {Button} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {userScreensList, adminScreenList} from './screenList';
import {firebaseLogout} from '../../actions/asyncActions';

const Drawer = createDrawerNavigator();

const App = () => {
  const isAdmin = useSelector(state => state.isAdmin);

  const screenList = isAdmin ? adminScreenList : userScreensList;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        {screenList.map(screen => (
          <Drawer.Screen
            key={screen.key}
            name={screen.name}
            component={screen.comp}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const CustomDrawerContent = props => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    props.navigation.closeDrawer();
    dispatch(firebaseLogout());
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button title="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default App;
