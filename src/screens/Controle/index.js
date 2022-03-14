import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native';
import styles from './styles'
import ModalControle from '../../components/Controle/Modal';
import { useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Controle({ navigation }) {

    const [visibleModal, setVisibleModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({})
    const [anoSelected, setAnoSelected] = useState([])

    function updateModal(item, value) {
        setVisibleModal(value)
        setItemSelected(item)
    }

    const onSelectedAnoChange = (selectedItem) => {
        setAnoSelected(selectedItem)
    };

    onSelectedItemsChange = (selectedItem) => {
        setSelected(selectedItem)
    };
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

    const anos = [
        {
            name: "Opções",
            id: 0,
            children: [
                { id: 1, name: '2010' }, { id: 2, name: '2011' }, { id: 3, name: '2012' }
            ]
        }
    ]


    const renderItem = ({ item }) => (
        <TouchableOpacity style={item.status == 1 ? styles.item : styles.itemError} onPress={() => updateModal(item, true)}>
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
            <View style={{ width: '100%' }} >
                <View style={styles.viewReferencia}>
                    <View style={{  padding: 15 }}>
                        <Text style={styles.textReferencia}>Ano Referencia: </Text>
                    </View>

                    <View style={styles.viewSelect}>
                        <SectionedMultiSelect
                            items={anos}
                            IconRenderer={Icon}
                            uniqueKey="id"
                            subKey="children"
                            selectText="Escolha o status..."
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={e => onSelectedAnoChange(e)}
                            selectedItems={anoSelected}
                            showCancelButton
                            single
                            searchPlaceholderText="Status"
                            confirmText="Confirmar"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewFlatList}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

            <ModalControle setModal={setVisibleModal} visibleModal={visibleModal} dados={itemSelected}></ModalControle>
        </View>
        // </SafeAreaView>
    )
}
