import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { TextInput } from 'react-native'
import styles from './styles'
import { faArrowRightToFile } from '@fortawesome/free-solid-svg-icons'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }) {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  // const [authUser, setAuthUser] = useState(null)

  async function auth() {
    if (user == null || password == null) {
      Alert.alert('Informe o usuário e a senha!')
      return
    }
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem(
          'TOKEN',
          JSON.stringify({ user: 'josias', password: '123456' })
        )
      } catch (e) {
        // saving error
      }
    }
    await storeData()
    const getToken = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('TOKEN')
        return jsonValue != null ? JSON.parse(jsonValue) : null
      } catch (e) {
        console.log(e, 'sd')
      }
    }
    console.log(await getToken())
    if (getToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'Main' }],
      //   })
      // )
    }
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'Main' }],
    //   })
    // )
    // let response = await fetch(
    //   'http://localhost:8000/api/auth/login?NOME=' +
    //     user +
    //     '&password=' +
    //     password,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setToken(res.access_token)
    //     Alert.alert('Logado')
    //     navigation.navigate('Main')
    //   })
    //   .catch((err) => Alert.alert(JSON.stringify(err)))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.welcome}>
            <View>
              <Text style={styles.messageWelcome}>Bem vindo!</Text>
            </View>
          </View>
          <View style={styles.title}>
            <View>
              <Text style={styles.messageTitle}>Otimizador</Text>
            </View>
            <View>
              <Text style={styles.messageTitle1}>Contábil</Text>
            </View>
          </View>
          <View style={styles.login}>
            <View>
              <Text style={styles.messageLogin}>Faça o login</Text>
            </View>
          </View>
          <View>
            <View style={styles.inputUsuario}>
              <TextInput
                style={styles.inputTextUsuario}
                placeholderTextColor="#cccccc"
                placeholder="Usuário"
                onChangeText={(text) => setUser(text)}
                maxLength={20}
              />
            </View>
            <View style={styles.inputSenha}>
              <TextInput
                style={styles.inputTextSenha}
                placeholderTextColor="#cccccc"
                placeholder="Senha"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                maxLength={20}
              />
            </View>
          </View>
          <View>
            <View style={styles.buttonLogin}>
              <TouchableOpacity
                style={styles.inputButtonLogin}
                onPress={() => auth()}
              >
                <View style={styles.viewButtonLogin}>
                  <Text>
                    Login {'  '}
                    <FontAwesomeIcon icon={faArrowRightToFile} />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.login}>
            <View>
              <Text style={styles.messageResetSenha}>Esqueceu a senha</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}