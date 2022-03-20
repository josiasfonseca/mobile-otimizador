import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
// any js module
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';


const http = axios.create({
  baseURL: 'https://api-otimizador.herokuapp.com/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


http.interceptors.request.use(
  async function (config) {

    let urlLogin = config.baseURL + 'auth/login'
    let urlMe = config.baseURL + 'auth/me'
    let urlLogout = config.baseURL + 'auth/logout'
    if (config.url !== urlMe && config.url !== urlLogin) {
      const tokenStorage = await getDadosToken()
      const token = `Bearer ${tokenStorage || ''}`
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    console.log(error.response)
    const originalRequest = (await error) && error.config ? error.config : null
    const errorStatus = error && error.response ? error.response.status : null
    const errorText = error && error.response ? error.response.data.errors : null
    if(errorText) {
      Alert.alert(JSON.stringify(errorText))
    }
    const urlLogout =
      error && error.config ? error.config.baseURL + 'auth/logout' : ''
    const urlLogin =
      error && error.config ? error.config.baseURL + 'auth/login' : ''
    /*
     * Quando a requisição tem status 401 e statusText,
     * será gerado uma nova requisição para gerar um novo token automaticamente
     */
    if (errorStatus === 401 && originalRequest.url != urlLogout && originalRequest.url != urlLogin) {
      const baseURL = http.defaults.baseURL
      return await http.get(baseURL + 'auth/logout')
        .then((resp) => {
          AsyncStorage.removeItem('TOKEN')
          ToastAndroid.show("Logout realizado", ToastAndroid.LONG)
          RootNavigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
          return resp.data
        })
        .catch(err => {
          throw err
        })
    }

  }
)

async function getDadosToken() {

  try {
    const jsonValue = await AsyncStorage.getItem('TOKEN')
    const retorno = jsonValue != null ? JSON.parse(jsonValue) : null
    if (retorno && retorno.token && retorno.user) {
      return retorno.token
    }
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export default http;