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

export default function Importador({ navigation }) {

    const [singleFile, setSingleFile] = useState(null);
    const [fileClienteCliente, setFileClienteCliente] = useState(null);
    const [fileClienteContabilidade, setFileClienteContabilidade] = useState(null);

    const uploadImage = async () => {
        // Check if any file is selected or not
        if (singleFile != null) {
            // If file selected then create FormData
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('name', 'Image Upload');
            data.append('file_attachment', fileToUpload);
            // Please change file upload URL
            let res = await fetch(
                'http://localhost/upload.php',
                {
                    method: 'post',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                    },
                }
            );
            let responseJson = await res.json();
            if (responseJson.status == 1) {
                alert('Upload Successful');
            }
        } else {
            // If no file selected the show alert
            alert('Please Select File first');
        }
    };

    async function selectFile() {
        // Opening Document Picker to select one file
        try {

            const res = await DocumentPicker.getDocumentAsync({});
            // console.log('res : ' + JSON.stringify(res));
            if (res && res.type == 'success')
                setSingleFile(res);

            Alert.alert('Arquivo carregado!\nNome: ' + res.name)
        } catch (err) {
            setSingleFile(null);
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
                <View style={styles.importCliente} >
                    <View style={styles.viewImports}>
                        <View style={styles.fileCliente}>
                            <Text>Arquivo cliente</Text>
                            <Button
                                title='importar'
                                onPress={selectFile}
                                color='#13B58C'
                                style={styles.inputButonImportCliente} />
                        </View>

                        <View style={styles.fileContabilidade}>
                            <Text>Arquivo Contabilidade</Text>
                            <Button
                                title='importar'
                                color='#13B58C'
                                style={styles.inputButonImportCliente} />
                        </View>
                    </View>
                </View>
                <View></View>
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
