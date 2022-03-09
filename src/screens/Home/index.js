import {
    View,
    Text,
    TouchableOpacity,
    Button,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native';
import styles from './styles'

export default function Home({ navigation }) {

    const DATA = [
        {
            id: '1',
            email: 'joao@ifpr.edu.br',
            empresa: 'Empresa 1',
        },
        {
            id: '2',
            email: 'maria@ifpr.edu.br',
            empresa: 'Empresa 2',
        },
        {
            id: '3',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '4',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '5',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '6',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '7',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '8',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '9',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '10',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '11',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '12',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },
        {
            id: '13',
            email: 'joana@ifpr.edu.br',
            empresa: 'Empresa 3',
        },

    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.row} >
                {/* <View style={styles.itemEmail}>
                    <Text style={styles.textItemEmail}>{item.email}</Text>
                </View> */}
                <View style={styles.itemCodigo} >
                    <Text style={styles.textItemCodigo}>{item.id}</Text>
                </View>
                <View style={styles.itemNome}>
                    <Text style={styles.textItemNome}>{item.empresa}</Text>
                </View>
                <View style={styles.buttonControle}>
                    <Button title='Controle' color="#7d807e" style={styles.inputButton} onPress={() => navigation.navigate('Controle')}></Button>
                </View>
                <View style={styles.buttonImportador}>
                    <Button title='Importador' color="#7a7a75" style={styles.inputButton} onPress={() => navigation.navigate('Importador')}></Button>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        //   <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>

        <View style={styles.container}>
            {/* <View style={styles.viewHeader}>
                <Text style={styles.header}>Home</Text>
            </View> */}
            <View style={styles.viewFlatList}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
        // </SafeAreaView>
    )
}
