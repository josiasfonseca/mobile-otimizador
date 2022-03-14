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
  BackHandler
} from 'react-native'
import { faArrowRightToFile } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './styles'

export default function Login({ navigation, route }) {

  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [urlAuth] = useState('https://api-otimizador.herokuapp.com/api/auth/login')

  useEffect(async () => {
    await getToken()
  }, []);


  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  async function storeData(){
    try {
      
      await AsyncStorage.setItem(
        'TOKEN',
        JSON.stringify({ token: token, user: userData })
      )
      const jsonValue = await AsyncStorage.getItem('TOKEN')

            const retorno = jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      showToast(JSON.stringify(e))
    }
  }
  
  async function getToken() {
    try {
      const jsonValue = await AsyncStorage.getItem('TOKEN')
      const retorno = jsonValue != null ? JSON.parse(jsonValue) : null
      if (retorno && retorno.token && retorno.user) {
        setUserData(retorno.user)
        setToken(retorno.token)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      }
    } catch (e) {
      showToast(JSON.stringify(e))
    }
  }
  // await getToken()

  async function auth() {

    if (user == null || password == null) {
      Alert.alert('Informe o usuário e a senha!')
      return
    }
    await fetch(
      urlAuth + '?login=' +
      user +
      '&password=' +
      password,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
        return res.json()
      })
      .then(async (res) => {
        if (res.access_token) {
          setToken(res.access_token)
          setUserData(res.user)
          
          await storeData()
          
          showToast('Logado com sucesso!')
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        } else {
          showToast('Falha de autenticação!')
        }
      })
      .catch((err) => {
        if (!getToken)
          showToast('Erro de conexão!')
        showToast('Failed connection! Try again!')
      })
  }
  // });
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
              {/* <Text style={styles.messageResetSenha}>Esqueceu a senha</Text> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
