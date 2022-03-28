import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const http = axios.create({
  baseURL: 'https://api-otimizador.herokuapp.com/api/',
  headers: {
    'Content-Type' : 'application/json'
  }
});


http.interceptors.request.use(
  async function (config) {

    let urlLogin = config.baseURL + 'auth/login'
    let urlMe = config.baseURL + 'auth/me'
    // let urlLogout = config.baseURL + 'auth/logout'
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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('ERROR RESPONSE DATA',error.response.data);
      console.log('ERROR RESPONSE STATUS',error.response.status);
      // console.log('ERROR RESPONSE HEADERS',error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('ERROR RESPONSE REQUEST',error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error MESSAGE', error.message);
    }

    console.log('REPONSE',error.response)
    const originalRequest = (await error) && error.config ? error.config : null
    const errorStatus = error && error.response ? error.response.status : null
    const errorText = error && error.response ? error.response.data.errors : null
    
    console.log('ERROR RESPONSE', errorText, errorStatus)
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
      await http.get(baseURL + 'auth/logout')
        .then((resp) => {
          AsyncStorage.removeItem('TOKEN')
          // ToastAndroid.show("Logout realizado", ToastAndroid.LONG)
          // RootNavigation.reset({
          //   index: 0,
          //   routes: [{ name: 'Login' }],
          // })
          throw resp.data
        })
        .catch(err => {
          throw err
        })
    }
    throw error
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
    throw JSON.stringify(e)
  }
}
export default http;