import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        color: '#E5E5E5',
        marginTop: StatusBar.currentHeight || 0,
    },
    viewHeader: {
        width: '100%',
        height: 90,
        alignItems: 'center',
        backgroundColor: '#13B58C'
    },
    header: {
        marginTop: 30,
        fontSize: 20,
        color: '#fff',
    },
    viewTitleImportadorCliente: {
        alignItems: 'center',
    },
    titleImportadorCliente: {
        fontSize: 20
    },
    viewImports: {
        flexDirection: 'row'
    },
    viewImportCliente: {
        marginTop: 20,
        width: '90%',
        height: 150,
        borderWidth: 1,
        borderRadius: 20
    },
    importCliente: {
        marginTop: 20,
        width: '100%',
        height: 150,
        alignItems: 'center'
    },
    fileCliente: {
        paddingHorizontal: 20
    },
    inputButonImportCliente: {
        borderRadius: 20,
        marginTop: 60
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
})

export default styles
