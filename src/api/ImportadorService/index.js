import http from '../'
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

//Clientes
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
    // const config = { responseType: 'json' };
    const store = await AsyncStorage.getItem('TOKEN')
    const j = JSON.parse(store)
    const token = j.token
    const bearer = `Bearer ${token || ''}`
    const h = {
        'authorization': bearer
    }
    const path = FileSystem.documentDirectory + 'file_contabilidade.xls'
    return await http.get(url)
        .then(async res => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
          
            if (status === "granted") {

                await FileSystem.writeAsStringAsync(path, res.data, { encoding: FileSystem.EncodingType.UTF8 })

                const  asset = await MediaLibrary.createAssetAsync(path)
                const copyUri = asset.uri.replace('.png', '.xls')
                const copyAsset = { ...asset, filename: 'file_contabilidade.xls', mediaType: 'unknown', uri: copyUri }
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null)
                    await MediaLibrary.createAlbumAsync("Download", copyAsset, false)
                else
                    await MediaLibrary.addAssetsToAlbumAsync([copyAsset], album, false);
                return 'ok'
            }
        })
        .catch(err => {
            return err
        })
}


//Fornecedor
export const updloadFilePagarCliente = async (fileToUpload, idEmpresa, idLayout) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + `importador/fornecedores/${idEmpresa}/${idLayout}`

        const file = { ...fileToUpload, type: fileToUpload.mimeType }
        const data = new FormData();
        data.append('arquivo_fornecedor', file);

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

export const updloadFilePagarContabilidade = async (fileToUpload, idEmpresa, idLayout) => {
    try {
        const baseURL = http.defaults.baseURL
        const url = baseURL + `importador/fornecedores/${idEmpresa}/${idLayout}`

        const file = { ...fileToUpload, type: fileToUpload.mimeType }
        const data = new FormData();
        data.append('arquivo_fornecedor_escritorio', file);

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

export const confrontarPagar = async (idEmpresa) => {
    const url = http.defaults.baseURL + `importador/fornecedores/confrontar/${idEmpresa}`

    return await http.get(url)
        .then(res => res)
        .catch(err => err)
}

export const gerarArquivoContabilidadeFornecedor = async (idEmpresa) => {
    const url = http.defaults.baseURL + `importador/fornecedores/gerarArquivoContabilidade/${idEmpresa}`

    return await http.get(url)
        .then(res => res)
        .catch(err => err)
}

export const downloadArquivoContabilidadeFornecedor = async (idEmpresa) => {

    const url = http.defaults.baseURL + `importador/fornecedores/download-fornecedores-contabilidade/${idEmpresa}/csv`
    // const config = { responseType: 'json' };
    const store = await AsyncStorage.getItem('TOKEN')
    const j = JSON.parse(store)
    const token = j.token
    const bearer = `Bearer ${token || ''}`
    const h = {
        'authorization': bearer
    }
    const path = FileSystem.documentDirectory + 'file_contabilidade.xls'
    return await http.get(url)
        .then(async res => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
          
            if (status === "granted") {

                await FileSystem.writeAsStringAsync(path, res.data, { encoding: FileSystem.EncodingType.UTF8 })

                const  asset = await MediaLibrary.createAssetAsync(path)
                const copyUri = asset.uri.replace('.png', '.xls')
                const copyAsset = { ...asset, filename: 'file_contabilidade.xls', mediaType: 'unknown', uri: copyUri }
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null)
                    await MediaLibrary.createAlbumAsync("Download", copyAsset, false)
                else
                    await MediaLibrary.addAssetsToAlbumAsync([copyAsset], album, false);
                return 'ok'
            }
        })
        .catch(err => {
            return err
        })
}

