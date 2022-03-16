import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

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