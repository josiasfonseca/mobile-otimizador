import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native'
import styles from './styles'
// import DocumentPicker from 'react-native-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Importador({ navigation }) {

    function teste() {
        console.log("asf")
        Alert.alert("TESTe TESTE TE TES")
    }
    const [fileClienteCliente, setFileClienteCliente] = useState(null);
    const [fileClienteContabilidade, setFileClienteContabilidade] = useState(null);

    // const selectFile = async () => {
    //     Alert.alert('Teste')
    //     // Opening Document Picker to select one file
    //     try {
    //         const res = await DocumentPicker.pick({
    //             // Provide which type of file you want user to pick
    //             type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
    //             // There can me more options as well
    //             // DocumentPicker.types.allFiles
    //             // DocumentPicker.types.images
    //             // DocumentPicker.types.plainText
    //             // DocumentPicker.types.audio
    //             // DocumentPicker.types.pdf
    //         });
    //         // Printing the log realted to the file
    //         console.log('res : ' + JSON.stringify(res));
    //         // Setting the state to show single file attributes
    //         setFileClienteCliente(res);
    //     } catch (err) {
    //         setFileClienteCliente(null);
    //         // Handling any exception (If any)
    //         if (DocumentPicker.isCancel(err)) {
    //             // If user canceled the document selection
    //             Alert.alert('Canceled');
    //         } else {
    //             // For Unknown Error
    //             Alert.alert('Unknown Error: ' + JSON.stringify(err));
    //             throw err;
    //         }
    //     }
    // }
    return (
        // <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            // <View style={{ width: '100%' }}>
                <View style={styles.container}>
                    
                    {/* <View style={styles.viewHeader}>
                        <Text style={styles.header}>Importador</Text>
                    </View> */}
                    <View style={styles.viewImportCliente}>
                        {/* <View style={styles.viewTitleImportadorCliente}>
                            <Text style={styles.titleImportadorCliente}>Importar arquivos Clientes</Text>
                        </View> */}
                        <View style={styles.importCliente} >
                            <View style={styles.viewImports}>
                                <View style={styles.fileCliente}>
                                    <Text>Arquivo cliente</Text>
                                    <Button
                                        title='importar'
                                        onPress={teste}
                                        color='#13B58C'
                                        style={styles.inputButonImportCliente} />
                                </View>

                                <View style={styles.fileContabilidade}>
                                    <Text>Arquivo Contabilidade</Text>
                                    <Button title='importar' color='#13B58C' style={styles.inputButonImportCliente}> </Button>
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
                        <View></View>
                    </View>
                </View>
            // </View>
        // </SafeAreaView>
    )
}
