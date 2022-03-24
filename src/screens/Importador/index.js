import React, { useState } from 'react';
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
import { updloadFileCliente } from '../../api/ImportadorService';

export default function Importador({ navigation }) {

    const [fileClienteCliente, setFileClienteCliente] = useState(null);
    const [fileClienteContabilidade, setFileClienteContabilidade] = useState(null);

    const uploadFiles = async (type) => {
        if (fileClienteCliente != null || fileClienteContabilidade != null) {
            // const fileToUpload = type == 'receberCliente' ? fileClienteCliente : fileClienteContabilidade;
            const fileToUpload = fileClienteCliente
            await updloadFileCliente(fileClienteCliente, 1, 1)
                .then(res => {
                    ToastAndroid.show('Enviou arquivo', ToastAndroid.LONG)
                    Alert.alert(JSON.stringify(res))
                })
                .catch(err => {
                    Alert.alert(JSON.stringify(err))
                    console.log('ERR: ', err)
                })
        } else {
            // If no file selected the show alert
            alert('Please Select File first');
        }
    };

    async function selectFile(type) {
        // Opening Document Picker to select one file
        try {
            console.log(DocumentPicker.)
            return
            await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: false,
                // type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'image/png']
            })
            .then(resp => {
                console.log('RES FILE SELECT ', resp)
                if (res && res.type == 'success') {
                    if (type == 'receberCliente')
                        setFileClienteCliente(res)
                    else if (type == 'receberContabilidade')
                        setFileClienteContabilidade(res)
                }
    
                Alert.alert('Arquivo carregado!\nNome: ' + res.name)
                
            })
            .catch(err => {
                console.log('Errrror' + JSON.stringify(err))
                Alert.alert('Errrror' + JSON.stringify(err))
            })
        } catch (err) {
            setFileClienteCliente(null);
            setFileClienteContabilidade(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                alert('Canceled');
            } else {
                ToastAndroid.show('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
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
                            onPress={() => selectFile('receberCliente')}
                            color='#13B58C'
                            style={styles.inputButonImportCliente} />
                    </View>
                    <View style={styles.fileReceberImportCliente}>
                        <Button
                            title='Enviar'
                            onPress={() => uploadFiles('')}
                            color='#13B58C'
                            disabled={fileClienteCliente == null || fileClienteContabilidade == null}
                            style={styles.inputButonImportCliente} />
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
