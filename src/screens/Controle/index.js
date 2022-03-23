import React, { useEffect, useState } from 'react';
import {
    View, Alert, ToastAndroid
} from 'react-native'
import styles from './styles'
import { ActivityIndicator, Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { getControles, deleteControle } from '../../api/ControleService';

export default function Controle({ navigation, route }) {

    const [visibleModal, setVisibleModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({})

    const [page, setPage] = useState(0);
    const [itemsPerPage, setitemsPerPage] = useState(15);
    const [totalPages, setTotalPages] = useState(1);
    const [searching, setSearching] = useState(false)
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [controls, setControls] = useState([])
    // const [empresa, setEmpresa] = useState({})

    function updateModal(item, value) {
        setVisibleModal(value)
        setItemSelected(item)
    }

    useEffect(async () => {
        await getApi()
    }, []);

    useEffect(async () => {
        await getApi()
    }, [page])

    useEffect(async () => {
        if (route.params && route.params.empresa
            || (route.params.atualizar && route.params.atualizar == 'S')) {
            if (!searching)
                await getApi()
            navigation.setOptions({ title: 'Controles Emp: ' + route.params.empresa.id_empresa })
        }
    }, [route.params]);

    const updatePage = async (page) => {
        if (!searching)
            setPage(page)
    }

    const getApi = async () => {
        try {
            setSearching(true)
            setVisibleActivityIndicator(true)
            
            const result = await getControles(route.params.empresa, page + 1)
            setitemsPerPage(result.per_page)
            setTotalPages(result.last_page - 1)
            setControls(result.data)
            setSearching(false)
            setVisibleActivityIndicator(false)
        } catch (error) {
            throw (JSON.stringify(error))
        } finally {
            setVisibleActivityIndicator(false)
        }
    }

    const confirmToDeleteControle = async (c) => {
        Alert.alert(
            "Exclusão",
            "Confima exclusão do controle " + c.id_controle + ' ?',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteControleC(c.id_controle) }
            ]
        );
    }

    const deleteControleC = async (id) => {
        setVisibleActivityIndicator(true)
        await deleteControle(id)
            .then(async res => {
                ToastAndroid.show(`Controle ${id} excluído com sucesso!`, ToastAndroid.LONG)
                await getApi()
            })
            .catch(err => {
                ToastAndroid.show(`Erro de exclusão! ${JSON.stringify(err)}`, ToastAndroid.LONG)
            })
        setVisibleActivityIndicator(false)
    }

    const elements = []
    const toRenderItems = async () => {
        for (let i = 0; i < controls.length; i++) {
            elements.push(controls[i])
        }
    }
    toRenderItems()

    function renderDataItem(controle, index) {
        return (
            <DataTable.Row style={controle.status == 1 ? styles.item : styles.itemError} key={index} onPress={() => updateModal(item, true)}>
                <DataTable.Cell numeric style={styles.cellId}>{controle.id_controle}</DataTable.Cell>
                <DataTable.Cell style={styles.cellNome}>{controle.ano}</DataTable.Cell>
                <DataTable.Cell style={styles.cellAcao}>
                    <View style={styles.viewButtonEdit}>
                        <Button
                            mode="text"
                            compact={true}
                            icon="pencil"
                            style={styles.buttonEdit}
                            labelStyle={{ fontSize: 30 }}
                            color="#2C3E50"
                            onPress={() => navigation.navigate('ControleForm', { controle: controle, empresa: route.params.empresa })} />
                    </View>
                    <View style={styles.viewButtonDelete}>
                        <Button
                            mode="text"
                            compact={true}
                            icon="trash-can-outline"
                            style={styles.buttonDelete}
                            labelStyle={{ fontSize: 30 }}
                            color="#943126"
                            onPress={() => confirmToDeleteControle(controle)} />
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
        )
    }

    return (
        //   <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>

        <View style={styles.container}>
            {/* <View style={styles.viewReferencia}>
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
            </View> */}
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
                    numberOfPages={totalPages + 1}
                    onPageChange={(page) => updatePage(page)}
                    label={(page + 1) + " de " + (totalPages + 1)}
                    optionsPerPage={itemsPerPage}
                    itemsPerPage={itemsPerPage}
                    numberOfItemsPerPage={15}
                    showFastPaginationControls
                />
            </DataTable>
            <Provider>
                <Portal >
                    <FAB
                        style={styles.fab}
                        open={false}
                        icon='plus'
                        color="#fff"
                        onPress={() => navigation.navigate('ControleForm', { empresa: route.params.empresa })}
                    />
                </Portal>
            </Provider>
            {
                visibleActivityIndicator &&
                <View style={styles.loading}  >
                    <ActivityIndicator color='#13B58C' />
                </View>
            }
        </View>
        // </SafeAreaView>
    )
}
