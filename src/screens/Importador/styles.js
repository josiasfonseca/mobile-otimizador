import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        color: '#E5E5E5',
    },
    viewImportCliente: {
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center',
        height: 250,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20
    },
    viewTitleImportadorCliente: {
        alignItems: 'center',
    },
    titleImportadorCliente: {
        fontSize: 20
    },
    viewImports: {
        flexDirection: 'row',
        backgroundColor: '#cdcdcd',
        height: 80,
        width: '90%',
        marginTop: 5,
        borderRadius: 10
    },
    viewImportDescricao: {
        width: '30%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewImportContent: {
        width: '70%',
        height: 80,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fileReceberImportCliente: {
        justifyContent: 'center',
        marginLeft: 10
    },
    inputButonImportCliente: {
        borderRadius: 20,
        marginTop: 60
    },
    ////
    importReceberCliente: {
        // marginTop: 5,
        width: '100%',
        height: 150,
        alignItems: 'center'
    },
    viewTitleImportadorFornecedor: {
        alignItems: 'center',
    },
    titleImportadorFornecedor: {
        fontSize: 20
    },
    viewImportFornecedor: {
        marginTop: 20,
        width: '90%',
        height: 150,
        borderWidth: 1,
        borderRadius: 20
    },
    importFornecedor: {
        marginTop: 20,
        width: '100%',
        height: 150,
        alignItems: 'center'
    },
    fileFornecedor: {
        paddingHorizontal: 20
    },
    inputButonImportFornecedor: {
        borderRadius: 20,
        marginTop: 60
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
      },
})

export default styles
