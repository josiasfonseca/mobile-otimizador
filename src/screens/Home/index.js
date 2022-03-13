import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    BackHandler,
    Alert
} from 'react-native'
import { FlatList } from 'react-native';
import styles from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileImport, faListCheck } from '@fortawesome/free-solid-svg-icons';

export default function Home({ navigation, route }) {

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
                {/* <View style={styles.buttonControle}>
                    <Button title='Controle' color="#A52A2A" style={styles.inputButton} onPress={() => navigation.navigate('Controle')}>
                        <Text>DDD</Text>
                    </Button>
                </View> */}
                <View style={styles.buttonControle}>
                    <TouchableOpacity
                        style={styles.inputButtonControle}
                        onPress={() => navigation.navigate('Controle')}
                    >
                        <View >
                            <Text style={{ color: '#fefefe' }}>
                                <FontAwesomeIcon icon={faListCheck} size={12} style={{ color: '#fefefe' }}/>
                                    {'  '}
                                    Controle
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonImportador}>
                    <TouchableOpacity
                        style={styles.inputButtonImportador}
                        onPress={() => navigation.navigate('Importador')}
                    >
                        <View >
                            <Text style={{ color: '#fefefe' }}>
                                <FontAwesomeIcon icon={faFileImport} size={14} style={{ color: '#fefefe' }}/>
                                    {'  '}
                                    Importador
                            </Text>
                        </View>
                    </TouchableOpacity>
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
