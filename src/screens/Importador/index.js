import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native'
import styles from './styles'
// Import Document Picker
import * as DocumentPicker from 'expo-document-picker';

import { ToastAndroid } from 'react-native';
import {
    updloadFileReceberCliente,
    updloadFileReceberContabilidade,
    confrontarReceber,
    gerarArquivoContabilidade,
    downloadArquivoContabilidade
} from '../../api/ImportadorService';

export default function Importador({ navigation, route }) {

    const [fileClienteCliente, setFileClienteCliente] = useState(null)
    const [fileClienteContabilidade, setFileClienteContabilidade] = useState(null)
    const [image, setImage] = useState(null)
    const [confrontar, setConfrontar] = useState({ cliente: false, cont: false })

    useEffect(() => {
        setFileClienteCliente(null)
        setFileClienteContabilidade(null)
        setConfrontar({ cliente: false, cont: false })
    }, [route])

    const downloadArquivoCont = async () => {
        await downloadArquivoContabilidade(1)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const gerarArquivoCont = async () => {
    }

    const realizarConfrontoCliente = async () => {
        return await confrontarReceber(1)
            .then(() => ToastAndroid.show('Operação realizada!', ToastAndroid.LONG))
            .catch(() => ToastAndroid.show('Erro. Tente novamente!', ToastAndroid.LONG))
    }
    const upload = async (type) => {
        if (type == 'receberCliente')
            return await updloadFileReceberCliente(fileClienteCliente, 1, 1)
                .then(() => setConfrontar({ ...confrontar, cliente: true }))
        else if (type == 'receberContabilidade')
            return await updloadFileReceberContabilidade(fileClienteContabilidade, 1, 1)
                .then(() => setConfrontar({ ...confrontar, cont: true }))
    }

    const uploadFiles = async (type) => {
        if (fileClienteCliente != null || fileClienteContabilidade != null) {
            await upload(type, 1, 1)
                .then(() => {
                    ToastAndroid.show('Enviou arquivo', ToastAndroid.LONG)
                })
                .catch((err) => {
                    console.log(err)
                    ToastAndroid.show('Erro ao enviar arquivo.', ToastAndroid.LONG)
                })
        } else {
            ToastAndroid.show('Nenhum arquivo selecionado.', ToastAndroid.LONG);
        }
    };

    async function selectFile(type) {
        // Opening Document Picker to select one file
        try {

            await DocumentPicker.getDocumentAsync({})
                .then(resp => {
                    if (resp && resp.type == 'success') {
                        if (type == 'receberCliente')
                            setFileClienteCliente(resp)
                        else if (type == 'receberContabilidade')
                            setFileClienteContabilidade(resp)
                        ToastAndroid.show('Arquivo carregado!\nNome: ' + resp.name, ToastAndroid.LONG)
                    }
                })
                .catch(() => {
                    ToastAndroid.show('Erro ao carregar arquivo...', ToastAndroid.LONG)
                })
        } catch (err) {
            setFileClienteCliente(null);
            setFileClienteContabilidade(null);
        }
    };

    return (
        // <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        // <View style={{ width: '100%' }}>
        <View style={styles.container}>
            <View style={styles.viewImportCliente}>
                <View style={styles.viewTitleImportadorCliente}>
                    <Text style={styles.titleImportadorCliente}>Importar arquivos Clientes</Text>
                </View>
                {/* Importação arquivo clientes */}
                <View style={styles.viewImports}>
                    <View style={styles.viewImportDescricao}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Arquivo Cliente</Text>
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='importar'
                            onPress={() => selectFile('receberCliente')}
                            color='#13B58C'
                            style={styles.inputButonImportCliente} />
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='Enviar'
                            onPress={() => uploadFiles('receberCliente')}
                            color='#13B58C'
                            disabled={fileClienteCliente == null}
                            style={styles.inputButonImportCliente} />
                    </View>
                </View>
                {/* Importação arquivo contabilidade */}
                <View style={styles.viewImports}>
                    <View style={styles.viewImportDescricao}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Arquivo Contabilidade</Text>
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='importar'
                            onPress={() => selectFile('receberContabilidade')}
                            color='#13B58C'
                            style={styles.inputButonImportCliente} />
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='Enviar'
                            onPress={() => uploadFiles('receberContabilidade')}
                            color='#13B58C'
                            disabled={fileClienteContabilidade == null}
                            style={styles.inputButonImportCliente} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            title='Confrontar'
                            onPress={() => realizarConfrontoCliente()}
                            color='#13B58C'
                            style={{ boderRadius: 20, marginTop: 10 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            title='Gerar Arquivo'
                            onPress={() => gerarArquivoCont()}
                            color='#13B58C'
                            style={{ boderRadius: 20, marginTop: 10 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            title='Download Arquivo Contabilidade'
                            onPress={() => downloadArquivoCont()}
                            color='#13B58C'
                            style={{ boderRadius: 20, marginTop: 10 }} />
                    </View>
                </View>
            </View>
            <View style={styles.viewImportFornecedor}>
                <View style={styles.viewTitleImportadorFornecedor}>
                    <Text style={styles.titleImportadorFornecedor}>Importar arquivos Fornecedores</Text>
                </View>
                <View style={styles.importFornecedor}>
                    <View style={styles.viewImports}>
                        <View style={styles.fileFornecedor}>
                            <Text>Arquivo fornecedor</Text>
                            <Button title='importar' color='#13B58C' style={styles.inputButonImportFornecedor}> </Button>
                        </View>

                        <View style={styles.fileContabilidade}>
                            <Text>Arquivo Contabilidade</Text>
                            <Button title='importar' color='#13B58C' style={styles.inputButonImportFornecedor}> </Button>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        // </View>
        // </SafeAreaView>
    )
}
