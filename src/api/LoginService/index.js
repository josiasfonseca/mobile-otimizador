import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../';

export const serviceLogin = async (login, password) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.post(baseURL + 'auth/login',
            {
                login: login,
                password: password
            }
        ).then((resp) => {
            if (resp && resp.data)
                return resp.data
        })
            .catch(err => {
                throw err
            })
    } catch (e) {
        throw e
    }
}

export const serviceLogout = async () => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'auth/logout')
            .then((resp) => {
                AsyncStorage.removeItem('TOKEN')
                return resp.data
            })
            .catch(err => {
                throw err
            })
    } catch (e) {
        throw e
    }
}

// export default { serviceLogin, serviceLogout }