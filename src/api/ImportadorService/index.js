import http from '../'

export const updloadFileReceberCliente = async (fileToUpload, idEmpresa, idLayout) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + `importador/clientes/${idEmpresa}/${idLayout}`

        const file = { ...fileToUpload, type: fileToUpload.mimeType }
        const data = new FormData();
        data.append('arquivo_cliente', file);

        return await http.post(url, data)
            .then(res => {
                return res
            })
            .catch(err => {
                throw JSON.stringify(err)
            })

    } catch (error) {

        throw error
    }

};

export const updloadFileReceberContabilidade = async (fileToUpload, idEmpresa, idLayout) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + `importador/clientes/${idEmpresa}/${idLayout}`

        const file = { ...fileToUpload, type: fileToUpload.mimeType }
        const data = new FormData();
        data.append('arquivo_escritorio', file);

        return await http.post(url, data)
            .then(res => {
                return res
            })
            .catch(err => {
                throw JSON.stringify(err)
            })

    } catch (error) {

        throw error
    }

};

export const confrontarReceber = async (idEmpresa) => {
    const url = http.defaults.baseURL + `importador/clientes/confrontar/${idEmpresa}`

    return await http.get(url)
        .then(res => res)
        .catch(err => err)
}

export const gerarArquivoContabilidade = async (idEmpresa) => {
    const url = http.defaults.baseURL + `importador/clientes/gerarArquivoContabilidade/${idEmpresa}`

    return await http.get(url)
        .then(res => res)
        .catch(err => err)
}

export const downloadArquivoContabilidade = async (idEmpresa) => {
    const url = http.defaults.baseURL + `importador/clientes/download-clientes-contabilidade/${idEmpresa}/csv`

    return await http.get(url, {
        responseType: 'blob'
    })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        })
        .catch(err => err)



    // return this.http.get(
    //     `${this.urlBase}/importador/clientes/download-clientes-contabilidade/${idEmpresa}/${extensao}`, {
    //       responseType: 'blob' as 'json'
    //     });
}