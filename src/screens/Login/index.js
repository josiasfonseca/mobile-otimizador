import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native'
import { faArrowRightToFile } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
import { serviceLogin }  from '../../api/LoginService'

export default function Login({ navigation, route }) {

  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [urlAuth] = useState('https://api-otimizador.herokuapp.com/api/auth/login')
  let realizandoLogin = false
  useEffect(async () => {
    // await getToken()
  }, []);


  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const storeData = async (json) => {
    try {
      await AsyncStorage.setItem(
        'TOKEN',
        JSON.stringify({ token: json.access_token, user: json.user })
      )
      const jsonValue = await AsyncStorage.getItem('TOKEN')

      const retorno = jsonValue != null ? JSON.parse(jsonValue) : null
      return retorno
    } catch (e) {
      showToast(JSON.stringify(e))
    }
  }

  async function auth() {
    if(realizandoLogin) {
      showToast('Realizando login. Aguarde!')
      return
    }
    realizandoLogin = true
    try {

      if (user == null || password == null) {
        Alert.alert('Informe o usuário e a senha!')
        return
      }
      await serviceLogin(user, password)
        .then(async (json) => {
          if (json) {
            if (json.access_token) {
              setToken(json.access_token)
              setUserData(json.user)
              
              await storeData(json)

              showToast('Logado com sucesso!')
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            } else {
              showToast('Falha de autenticação!')
            }
          } else {
            showToast('Falha de autenticação!')
          }
        })
        .catch(err => Alert.alert('Error' + JSON.stringify(err)))
        .finally(() => realizandoLogin = false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      onPress={Keyboard.dismiss}
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
                onChangeText={(text) => setUser(text.toLocaleLowerCase())}
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
              {/* <Text style={styles.messageResetSenha}>Esqueceu a senha</Text> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
