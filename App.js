import React, { useEffect } from 'react'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Controle from './src/screens/Controle'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Importador from './src/screens/Importador'
import Usuario from './src/screens/Usuario'
import UsuarioEdit from './src/screens/Usuario/UsuarioEdit'
import Empresa from './src/screens/Empresa'
import EmpresaEdit from './src/screens/Empresa/EmpresaEdit'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerComponent } from './src/components/DrawerComponent';

const Drawer = createDrawerNavigator();

export default function App() {
   
  const screensOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: '#13B58C', height: 90 },
    headerTitleStyle: { color: '#fff', fontSize: 20 },
    backBehavior: 'history',
    drawerHideStatusBarOnOpen: false,
    drawerStatusBarAnimation: 'fade'
  }
  return (
    <NavigationContainer >
      <Drawer.Navigator
        drawerContent={props => <DrawerComponent {...props} />}
        initialRouteName="Login"
        screenOptions={screensOptions}
        backBehavior='history'
      >
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, gestureEnabled: false, swipeEnabled: false }} />
          <Drawer.Screen name="Home" component={Home} options={{ title: 'Operações' }} />
          <Drawer.Screen name="Controle" component={Controle} />
          <Drawer.Screen name="Importador" component={Importador} />
          <Drawer.Screen name="Usuario" component={Usuario} />
          <Drawer.Screen name="UsuarioEdit" component={UsuarioEdit} options={{ title: 'Edição de Usuário' }} />
          <Drawer.Screen name="Empresa" component={Empresa} />
          <Drawer.Screen name="EmpresaEdit" component={EmpresaEdit} options={{ title: 'Edição de Empresa' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}