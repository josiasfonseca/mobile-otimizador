import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
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
    downloadArquivoContabilidade,
    updloadFilePagarCliente,
    updloadFilePagarContabilidade,
    confrontarPagar,
    gerarArquivoContabilidadeFornecedor,
    downloadArquivoContabilidadeFornecedor
} from '../../api/ImportadorService';
import { ActivityIndicator } from 'react-native-paper';

export default function Importador({ navigation, route }) {

    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)

    //Dados clientes
    const [fileClienteCliente, setFileClienteCliente] = useState(null)
    const [fileClienteContabilidade, setFileClienteContabilidade] = useState(null)
    const [confrontar, setConfrontar] = useState({ cliente: false, cont: false })
    const [showButtonConfrontar, setShowButtonConfrontar] = useState(false)
    const [showButtonGerarArquivo, setShowButtonGerarArquivo] = useState(false)
    const [showButtonBaixarArquivo, setShowButtonBaixarArquivo] = useState(false)

    //Dados Fornecedor
    const [fileFornecedorCliente, setFileFornecedorCliente] = useState(null)
    const [fileFornecedorContabilidade, setFileFornecedorContabilidade] = useState(null)
    const [confrontarFornecedor, setConfrontarFornecedor] = useState({ cliente: false, cont: false })
    const [showButtonConfrontarFornecedor, setShowButtonConfrontarFornecedor] = useState(false)
    const [showButtonGerarArquivoFornecedor, setShowButtonGerarArquivoFornecedor] = useState(false)
    const [showButtonBaixarArquivoFornecedor, setShowButtonBaixarArquivoFornecedor] = useState(false)

    const [company, setCompany] = useState(empresa)

    const empresa = {
        id_empresa: '',
        nome: '',
        razao_social: '',
        cnpj: '',
        ie: '',
        im: '',
        tipo: 'S.N.',
        email: '',
        contato: '',
        telefone: '',
        whatsapp: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        codigo_municipio: '',
        usuario_id: 1,
        cidade: '',
        uf: '',
      }

    useEffect(() => {
        setFileClienteCliente(null)
        setFileClienteContabilidade(null)
        setConfrontar({ cliente: false, cont: false })

        setFileFornecedorCliente(null)
        setFileFornecedorContabilidade(null)
        setConfrontarFornecedor({ fornecedor: false, cont: false })
    }, [route])
    
    useEffect(() => {
        if(route.params && route.params.empresa && route.params.empresa.id_empresa) {
            console.log(route.params.empresa.id_empresa)
            setCompany({ ...route.params.empresa })
            navigation.setOptions({ title: 'Importador ' + route.params.empresa.id_empresa })
        }
    }, [route.params])

    //Dados clientes
    const downloadArquivoCont = async () => {
        setVisibleActivityIndicator(true)

        downloadArquivoContabilidade(company.id_empresa)
            .then(res => {
                ToastAndroid.show('Download realizado com sucesso!', ToastAndroid.LONG)
            })
            .catch(err => {
                ToastAndroid.show('Erro no download', ToastAndroid.LONG)
            })
            .finally(() => {
                setVisibleActivityIndicator(false)
                setShowButtonConfrontar(false)
                setShowButtonGerarArquivo(false)
                setShowButtonBaixarArquivo(false)
            })
    }

    const gerarArquivoCont = async () => {
        setVisibleActivityIndicator(true)
        await gerarArquivoContabilidade(company.id_empresa)
            .then(() => {
                setShowButtonConfrontar(false)
                setShowButtonGerarArquivo(false)
                setShowButtonBaixarArquivo(true)
                ToastAndroid.show('Arquivo gerado. Clique em fazer download!', ToastAndroid.LONG)
            })
            .catch(() => ToastAndroid.show('Erro. Tente novamente!', ToastAndroid.LONG))
            .finally(() => setVisibleActivityIndicator(false))
    }

    const realizarConfrontoCliente = async () => {
        setVisibleActivityIndicator(true)
        return await confrontarReceber(1)
            .then(() => {
                setShowButtonConfrontar(false)
                setShowButtonGerarArquivo(true)
                setShowButtonBaixarArquivo(false)
                ToastAndroid.show('Operação realizada!', ToastAndroid.LONG)
            })
            .catch(() => ToastAndroid.show('Erro. Tente novamente!', ToastAndroid.LONG))
            .finally(() => setVisibleActivityIndicator(false))
    }
    const upload = async (type) => {
        if (type == 'receberCliente')
            return await updloadFileReceberCliente(fileClienteCliente, company.id_empresa, 1)
                .then(() => setConfrontar({ ...confrontar, cliente: true }))
        else if (type == 'receberContabilidade')
            return await updloadFileReceberContabilidade(fileClienteContabilidade, company.id_empresa, 1)
                .then(() => setConfrontar({ ...confrontar, cont: true }))
        else if (type == 'pagarCliente')
            return await updloadFilePagarCliente(fileFornecedorCliente, company.id_empresa, 1)
                .then(() => setConfrontarFornecedor({ ...confrontarFornecedor, fornecedor: true }))
        else if (type == 'pagarContabilidade')
            return await updloadFilePagarContabilidade(fileFornecedorContabilidade, company.id_empresa, 1)
                .then(() => setConfrontarFornecedor({ ...confrontarFornecedor, cont: true }))

    }

    const uploadFiles = async (type) => {
        if (fileClienteCliente != null || fileClienteContabilidade != null) {
            setVisibleActivityIndicator(true)
            await upload(type, company.id_empresa, 1)
                .then(() => {
                    if (fileClienteCliente && fileClienteContabilidade) {
                        setShowButtonConfrontar(true)
                        setShowButtonGerarArquivo(false)
                        setShowButtonBaixarArquivo(false)
                    }
                    ToastAndroid.show('Enviou arquivo', ToastAndroid.LONG)
                })
                .catch((err) => {
                    ToastAndroid.show('Erro ao enviar arquivo.', ToastAndroid.LONG)
                })
                .finally(() => setVisibleActivityIndicator(false))
        } else {
            ToastAndroid.show('Nenhum arquivo selecionado.', ToastAndroid.LONG);
        }
    };

    async function selectFile(type) {
        setVisibleActivityIndicator(true)
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
                .finally(() => setVisibleActivityIndicator(false))
        } catch (err) {
            setVisibleActivityIndicator(false)
            setFileClienteCliente(null);
            setFileClienteContabilidade(null);
        }
    };

    //Dados Fornecedores
    const downloadArquivoContFornecedor = async () => {
        setVisibleActivityIndicator(true)

        downloadArquivoContabilidadeFornecedor(1)
            .then(res => {
                ToastAndroid.show('Download realizado com sucesso!', ToastAndroid.LONG)
            })
            .catch(err => {
                ToastAndroid.show('Erro no download', ToastAndroid.LONG)
            })
            .finally(() => {
                setVisibleActivityIndicator(false)
                setShowButtonConfrontarFornecedor(false)
                setShowButtonGerarArquivoFornecedor(false)
                setShowButtonBaixarArquivoFornecedor(false)
            })
    }

    const gerarArquivoContFornecedor = async () => {
        setVisibleActivityIndicator(true)
        await gerarArquivoContabilidadeFornecedor(1)
            .then(() => {
                setShowButtonConfrontarFornecedor(false)
                setShowButtonGerarArquivoFornecedor(false)
                setShowButtonBaixarArquivoFornecedor(true)
                ToastAndroid.show('Arquivo gerado. Clique em fazer download!', ToastAndroid.LONG)
            })
            .catch(() => ToastAndroid.show('Erro. Tente novamente!', ToastAndroid.LONG))
            .finally(() => setVisibleActivityIndicator(false))
    }

    const realizarConfrontoClienteFornecedor = async () => {
        setVisibleActivityIndicator(true)
        return await confrontarPagar(1)
            .then(() => {
                setShowButtonConfrontarFornecedor(false)
                setShowButtonGerarArquivoFornecedor(true)
                setShowButtonBaixarArquivoFornecedor(false)
                ToastAndroid.show('Operação realizada!', ToastAndroid.LONG)
            })
            .catch(() => ToastAndroid.show('Erro. Tente novamente!', ToastAndroid.LONG))
            .finally(() => setVisibleActivityIndicator(false))
    }

    const uploadFilesFornecedor = async (type) => {
        if (fileFornecedorCliente != null || fileFornecedorContabilidade != null) {
            setVisibleActivityIndicator(true)
            await upload(type, company.id_empresa, 1)
                .then(() => {
                    if (fileFornecedorCliente && fileFornecedorContabilidade) {
                        setShowButtonConfrontarFornecedor(true)
                        setShowButtonGerarArquivoFornecedor(false)
                        setShowButtonBaixarArquivoFornecedor(false)
                    }
                    ToastAndroid.show('Enviou arquivo', ToastAndroid.LONG)
                })
                .catch((err) => {
                    ToastAndroid.show('Erro ao enviar arquivo.', ToastAndroid.LONG)
                })
                .finally(() => setVisibleActivityIndicator(false))
        } else {
            ToastAndroid.show('Nenhum arquivo selecionado.', ToastAndroid.LONG);
        }
    };

    async function selectFileFornecedor(type) {
        setVisibleActivityIndicator(true)
        try {
            await DocumentPicker.getDocumentAsync({})
                .then(resp => {
                    if (resp && resp.type == 'success') {
                        if (type == 'pagarCliente')
                            setFileFornecedorCliente(resp)
                        else if (type == 'pagarContabilidade')
                            setFileFornecedorContabilidade(resp)
                        ToastAndroid.show('Arquivo carregado!\nNome: ' + resp.name, ToastAndroid.LONG)
                    }
                })
                .catch(() => {
                    ToastAndroid.show('Erro ao carregar arquivo...', ToastAndroid.LONG)
                })
                .finally(() => setVisibleActivityIndicator(false))
        } catch (err) {
            setVisibleActivityIndicator(false)
            setFileFornecedorCliente(null);
            setFileFornecedorContabilidade(null);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewImportCliente}>
                <View style={styles.viewTitleImportadorCliente}>
                    <Text style={styles.titleImportadorCliente}>Importar arquivos Clientes</Text>
                </View>
                {/* Importação arquivo RECEBER clientes */}
                <View style={styles.viewImports}>
                    <View style={styles.viewImportDescricao}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Arquivo Cliente</Text>
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='importar'
                            onPress={() => selectFile('receberCliente')}
                            color='#13B58C'
                            disabled={fileClienteCliente != null}
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
                {/* Importação RECEBER arquivo contabilidade */}
                <View style={styles.viewImports}>
                    <View style={styles.viewImportDescricao}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Arquivo Contabilidade</Text>
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='importar'
                            onPress={() => selectFile('receberContabilidade')}
                            color='#13B58C'
                            disabled={fileClienteContabilidade != null}
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
                    {showButtonConfrontar &&
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title='Confrontar'
                                onPress={() => realizarConfrontoCliente()}
                                color='#13B58C'
                                style={{ boderRadius: 20, marginTop: 10 }} />
                        </View>}
                    {showButtonGerarArquivo &&
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title='Gerar Arquivo'
                                onPress={() => gerarArquivoCont()}
                                color='#13B58C'
                                style={{ boderRadius: 20, marginTop: 10 }} />
                        </View>}
                    {showButtonBaixarArquivo &&
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title='Download'
                                onPress={() => downloadArquivoCont()}
                                color='#13B58C'
                                style={{ boderRadius: 20, marginTop: 10 }} />
                        </View>}
                </View>
            </View>
            {/* Importar arquivos Fornecedores */}
            <View style={styles.viewImportCliente}>
                <View style={styles.viewTitleImportadorCliente}>
                    <Text style={styles.titleImportadorCliente}>Importar arquivos Fornecedores</Text>
                </View>
                {/* Importação arquivo PAGAR cliente */}
                <View style={styles.viewImports}>
                    <View style={styles.viewImportDescricao}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Arq. Fornecedor</Text>
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='importar'
                            onPress={() => selectFileFornecedor('pagarCliente')}
                            color='#13B58C'
                            disabled={fileFornecedorCliente != null}
                            style={styles.inputButonImportCliente} />
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='Enviar'
                            onPress={() => uploadFilesFornecedor('pagarCliente')}
                            color='#13B58C'
                            disabled={fileFornecedorCliente == null}
                            style={styles.inputButonImportCliente} />
                    </View>
                </View>
                {/* Importação PAGAR arquivo contabilidade */}
                <View style={styles.viewImports}>
                    <View style={styles.viewImportDescricao}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Arq. Contabilidade</Text>
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='importar'
                            onPress={() => selectFileFornecedor('pagarContabilidade')}
                            color='#13B58C'
                            disabled={fileFornecedorContabilidade != null}
                            style={styles.inputButonImportCliente} />
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='Enviar'
                            onPress={() => uploadFilesFornecedor('pagarContabilidade')}
                            color='#13B58C'
                            disabled={fileFornecedorContabilidade == null}
                            style={styles.inputButonImportCliente} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {showButtonConfrontarFornecedor &&
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title='Confrontar'
                                onPress={() => realizarConfrontoClienteFornecedor()}
                                color='#13B58C'
                                style={{ boderRadius: 20, marginTop: 10 }} />
                        </View>}
                    {showButtonGerarArquivoFornecedor &&
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title='Gerar Arquivo'
                                onPress={() => gerarArquivoContFornecedor()}
                                color='#13B58C'
                                style={{ boderRadius: 20, marginTop: 10 }} />
                        </View>}
                    {showButtonBaixarArquivoFornecedor &&
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title='Download'
                                onPress={() => downloadArquivoContFornecedor()}
                                color='#13B58C'
                                style={{ boderRadius: 20, marginTop: 10 }} />
                        </View>}
                </View>
            </View>
            {
                visibleActivityIndicator &&
                <View style={styles.loading}  >
                    <ActivityIndicator color='#13B58C' />
                </View>
            }
        </View>
    )
}
