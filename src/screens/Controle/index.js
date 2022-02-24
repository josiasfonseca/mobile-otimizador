import {
    View,
    Text,
    TouchableOpacity,
    Button,
    TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native';
import styles from './styles'

export default function Controle({ navigation }) {

    const DATA = [
        {
            id: '1',
            mes: 'Janeiro',
            status: '',
        },
        {
            id: '2',
            mes: 'Fevereiro',
            status: 1,
        },
        {
            id: '3',
            mes: 'Março',
            status: 0,
        },
        {
            id: '4',
            mes: 'Abril',
            status: '',
        },
        {
            id: '5',
            mes: 'Maio',
            status: 1,
        },
        {
            id: '6',
            mes: 'Junho',
            status: 1,
        },
        {
            id: '7',
            mes: 'Julho',
            status: 1,
        },
        {
            id: '8',
            mes: 'Agosto',
            status: 1,
        },
        {
            id: '9',
            mes: 'Setembro',
            status: 0,
        },
        {
            id: '10',
            mes: 'Outubro',
            status: 0,
        },
        {
            id: '11',
            mes: 'Novembro',
            status: '',
        },
        {
            id: '12',
            mes: 'Dezembro',
            status: 1,
        },
    ];
    
    const renderItem = ({ item }) => (
        <TouchableOpacity style={item.status == 1 ? styles.item : styles.itemError}>
            <View style={styles.row} >
                <View style={styles.itemCodigo} >
                    <Text style={styles.textItemCodigo}>{item.id}</Text>
                </View>
                <View style={styles.itemNome}>
                    <Text style={styles.textItemNome}>{item.mes}</Text>
                </View>
                <View style={styles.itemStatus}>
                    <Text style={styles.textItemStatus}>{item.status == 1 ? 'OK' : 'Erro'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        //   <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>

        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <Text style={styles.header}>Controles</Text>
            </View>
            <View style={styles.viewReferencia}>
                <Text style={styles.textReferencia}>Ano Referencia: </Text>
                <TextInput placeholder='Ano' keyboardType='numeric' maxLength={4} />
            </View>
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
