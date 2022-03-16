import React, { useEffect } from 'react';
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
import { Button, DataTable } from 'react-native-paper';

export default function Controle({ navigation }) {

    const [visibleModal, setVisibleModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({})
    const [anoSelected, setAnoSelected] = useState([])

    const optionsPerPage = [2, 3, 4];

    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


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

    const elements = []
    for (let i = 0; i < DATA.length; i++) {
        elements.push(DATA[i])
    }

    function renderDataItem(item, index) {
        return (
            <DataTable.Row style={item.status == 1 ? styles.item : styles.itemError} key={index} onPress={() => updateModal(item, true)}>
                <DataTable.Cell numeric style={styles.cellId}>{item.id}</DataTable.Cell>
                <DataTable.Cell style={styles.cellNome}>{item.mes}</DataTable.Cell>
                <DataTable.Cell style={styles.cellAcao}>{item.status == 1 ? 'OK' : 'Erro'}</DataTable.Cell>
            </DataTable.Row>
        )
    }

    return (
        //   <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>

        <View style={styles.container}>
                <View style={styles.viewReferencia}>
                    <View style={styles.viewTextReferencia}>
                        <Text style={styles.textReferencia}>Ano Referencia: </Text>
                    </View>

                    <View style={styles.viewSelect}>
                        <SectionedMultiSelect
                            items={anos}
                            IconRenderer={Icon}
                            uniqueKey="id"
                            subKey="children"
                            selectText="Ano"
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={e => onSelectedAnoChange(e)}
                            selectedItems={anoSelected}
                            showCancelButton
                            single
                            searchPlaceholderText="Ano"
                            confirmText="Confirmar"
                        />
                    </View>
                </View>
            {/* <View style={styles.container}> */}
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title numeric style={styles.titleId}>ID</DataTable.Title>
                        <DataTable.Title style={styles.titleNome}>Nome</DataTable.Title>
                        <DataTable.Title style={styles.titleAcao}>Ação</DataTable.Title>
                    </DataTable.Header>

                    <View>
                        {elements.map((item, index) => renderDataItem(item, index))}
                    </View>

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={3}
                        onPageChange={(page) => setPage(page)}
                        label="1-2 of 6"
                        optionsPerPage={optionsPerPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        showFastPagination
                        optionsLabel={'Rows per page'}
                    />
                </DataTable>
            {/* </View> */}

            <ModalControle setModal={setVisibleModal} visibleModal={visibleModal} dados={itemSelected}></ModalControle>
        </View>
        // </SafeAreaView>
    )
}
