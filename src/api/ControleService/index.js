import { ToastAndroid } from 'react-native';
import http from '../';

export const getControles = async (empresa, page) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + 'controles/' + empresa.id_empresa + '?page=' + page
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

export const getControle = async (id) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'controles/' + id)
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

export const insertControle = async (controle) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.post(baseURL + 'controles/', controle)
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

export const updateControle = async (id, controle) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.put(baseURL + 'controles/' + id, controle)
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

export const deleteControle = async (id) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.delete(baseURL + 'controles/' + id)
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