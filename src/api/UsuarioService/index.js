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
                console.log(err)
                throw err
            })
    } catch (e) {
        console.log(e)
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

export const insertUsuario = async (usuario) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.post(baseURL + 'usuarios/', usuario)
        .then((resp) => {
            ToastAndroid.show(JSON.stringify(resp.status), ToastAndroid.LONG)
            return resp.status
        })
            .catch(err => {
                ToastAndroid.show(JSON.stringify(err.response.data), ToastAndroid.LONG)
                throw err
            })
    } catch (e) {
        ToastAndroid.show(JSON.stringify(e.response.data), ToastAndroid.LONG)
        console.log(e)
    }
}

export const updateUsuario = async (id, usuario) => {
    try {
        console.log("update", id, usuario)
        const baseURL = http.defaults.baseURL
        return await http.put(baseURL + 'usuarios/' + id, usuario)
        .then((resp) => {
            return resp.status
        })
            .catch(err => {
                ToastAndroid.show(JSON.stringify(err.response.data), ToastAndroid.LONG)
                throw err
            })
    } catch (e) {
        ToastAndroid.show(JSON.stringify(e.response.data), ToastAndroid.LONG)
        console.log(e)
    }
}