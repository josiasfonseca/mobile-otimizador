import http from '../';

export const updloadFileCliente = async (fileToUpload, idEmpresa, idLayout) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + `importador/clientes/${idEmpresa}/${idLayout}`
        
        const file = new FormData()
        file.append('arquivo_cliente', fileToUpload, 'file');
        console.log(file)
        return await http.post(url, file)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })

    } catch (error) {
        throw error
    }

};