import { ToastAndroid } from 'react-native';
import http from '../';

export const getUsuarios = async (page) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + 'usuarios?page=' + page
        return await http.get(url)
            .then((resp) => {
                return resp.data
            })
            .catch(err => {
                throw err
            })
    } catch (e) {
        console.log('ERR 22 ', e)
    }
}

export const getUsuario = async (id) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'usuarios/' + id)
            .then((resp) => {
                return resp.data
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    } catch (e) {
        console.log(e)
    }
}

const removeCaracteres = (value) => {
    return value.replace(/[^0-9]/g, '')
}

const removeCaracteresLogin = (value) => {
    console.log(value)
    return value.replace(/[^a-zA-z]/g, '')
}
export const insertUsuario = async (usuario) => {
    try {
        const usu = ({...usuario, cpf: removeCaracteres(usuario.cpf), 
                                  telefone: removeCaracteres(usuario.telefone), 
                                  whatsapp: removeCaracteres(usuario.whatsapp), 
                                  cep: removeCaracteres(usuario.cep), 
                                  login: removeCaracteresLogin(usuario.login.toLowerCase())})
        const baseURL = http.defaults.baseURL
        return await http.post(baseURL + 'usuarios/', usu)
            .then((resp) => {
                return resp
            })
            .catch(err => {
                throw err
            })
    } catch (e) {
        console.log(e)
    }
}

export const updateUsuario = async (id, usuario) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.put(baseURL + 'usuarios/' + id, usuario)
            .then((resp) => {
                return resp
            })
            .catch(err => {
                ToastAndroid.show(JSON.stringify(err), ToastAndroid.LONG)
                throw err
            })
    } catch (e) {
        ToastAndroid.show(JSON.stringify(e), ToastAndroid.LONG)
        console.log(e)
    }
}