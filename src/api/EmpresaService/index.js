import { ToastAndroid } from 'react-native';
import http from '../';

export const getEmpresas = async (page) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + 'empresas?page=' + page
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

export const getEmpresa = async (id) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'empresas/' + id)
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

export const insertEmpresa = async (empresa) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.post(baseURL + 'empresas/', empresa)
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

export const updateEmpresa = async (id, empresa) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.put(baseURL + 'empresas/' + id, empresa)
        .then((resp) => {
            return resp
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