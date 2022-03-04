import Login from './src/screens/Login'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Controle from './src/screens/Controle'
import Importador from './src/screens/Importador'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Stack.Screen name="Controle" component={Controle}  options={{ headerShown: false }}/>
        <Stack.Screen name="Importador" component={Importador}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
