import http from '../';

export const getUsuarios = async () => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'usuarios')
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

export const getUsuario = async (id) => {
    try {
        const baseURL = http.defaults.baseURL
        return await http.get(baseURL + 'usuarios/' + id)
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