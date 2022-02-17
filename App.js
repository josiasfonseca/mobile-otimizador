import { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import Login from './src/components/Login'
import Main from './src/components/Main'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Overview' }}
        />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// const [logado, setLogado] = useState(null)
// return (
//   <View style={styles.container}>
//     <StatusBar
//       barStyle="dark-content"
//       hidden={true}
//       backgroundColor="#0066CC"
//       translucent={false}
//       networkActivityIndicatorVisible={true}
//     />
//     {logado != null ? (
//       <View>
//         <Main />
//       </View>
//     ) : (
//       <View>
//         <Login />
//       </View>
//     )}
//   </View>
// )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#13B58C',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  statusBar: {
    // width: '100%',
    // height: '500',
    // backgroundColor: 'red',
    // marginTop: 20,
    // alignItems: 'center',
    // textAlignVertical: 'top',
  },
})
