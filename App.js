
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Controle from './src/screens/Controle'
import Importador from './src/screens/Importador'

const Stack = createNativeStackNavigator()

export default function App() {
  const screensOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: '#13B58C', height: 60},
    headerTitleStyle: { color: '#fff', fontSize: 20 }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screensOptions}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Controle" component={Controle}/>
        <Stack.Screen name="Importador" component={Importador}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
