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
            return resp.data
        })
            .catch(err => {
                throw err
            })
    } catch (e) {
        console.log(e)
    }
}

export const serviceLogout = async () => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'auth/logout')
            .then((resp) => {
                return resp.data
            })
            .catch(err => {
                throw err
            })
    } catch (e) {
        console.log(e)
    }
}

// export default { serviceLogin, serviceLogout }