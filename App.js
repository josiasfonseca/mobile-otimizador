import React, { useEffect } from 'react'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Controle from './src/screens/Controle'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Importador from './src/screens/Importador'
import { NavigationContainer } from '@react-navigation/native'
import { Alert, BackHandler } from 'react-native';
import { DrawerComponent } from './src/components/DrawerComponent';

const Drawer = createDrawerNavigator();

export default function App() {
  // const backAction = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel"
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() }
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);


  const screensOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: '#13B58C', height: 90 },
    headerTitleStyle: { color: '#fff', fontSize: 20 },
    backBehavior: 'history',
    drawerHideStatusBarOnOpen: true,
    drawerStatusBarAnimation: 'fade'
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerComponent {...props} />}
        initialRouteName="Home"
        screenOptions={screensOptions}
        backBehavior='history'
      >
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: false, swipeEnabled: false }} />
        <Drawer.Screen name="Home" component={Home} options={{  title: 'Operações' }} />
        <Drawer.Screen name="Controle" component={Controle} />
        <Drawer.Screen name="Importador" component={Importador} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}