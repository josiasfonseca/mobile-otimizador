import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Controle from './src/screens/Controle'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Main from './src/screens/Main'
import Importador from './src/screens/Importador'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

export default function App() {
  const screensOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: '#13B58C', height: 60 },
    headerTitleStyle: { color: '#fff', fontSize: 20 },
    backBehavior: 'history',
    drawerHideStatusBarOnOpen: true,
    drawerStatusBarAnimation: 'fade'
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" screenOptions={screensOptions}  backBehavior='history' >
        <Drawer.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false, gestureEnabled: false, swipeEnabled: false }} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Controle" component={Controle} />
        <Drawer.Screen name="Importador" component={Importador} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   const screensOptions = {
//     headerTitleAlign: 'center',
//     headerBackTitleVisible: false,
//     headerStyle: { backgroundColor: '#13B58C', height: 60},
//     headerTitleStyle: { color: '#fff', fontSize: 20 }
//   }
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login" screenOptions={screensOptions}>
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="Main" component={Main} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Controle" component={Controle}/>
//         <Stack.Screen name="Importador" component={Importador}  />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
