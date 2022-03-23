import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, DataTable } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'
import { getEmpresas } from '../../api/EmpresaService';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home({ navigation, route }) {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searching, setSearching] = useState(false)
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [companies, setCompanies] = useState([])

    useEffect(async () => {
        await getApi()
    }, []);

    useEffect(async () => {
        await getApi()
    }, [route.params]);

    useEffect(async () => {
        await getApi()
    }, [page])

    const updatePage = async (page) => {
        if (!searching)
            setPage(page)
    }

    const getApi = async () => {
        setSearching(true)
        setVisibleActivityIndicator(true)
        const result = await getEmpresas(page + 1)
        setitemsPerPage(result.per_page)
        setTotalPages(result.last_page - 1)
        setCompanies(result.data)
        setSearching(false)
        setVisibleActivityIndicator(false)
    }

    const elements = []
    const toRenderItems = async () => {
        for (let i = 0; i < companies.length; i++) {
            elements.push(companies[i])
        }
    }
    toRenderItems()

    function renderDataItem(empresa, index) {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell numeric style={styles.cellId}>{empresa.id_empresa}</DataTable.Cell>
                <DataTable.Cell style={styles.cellNome}>{empresa.nome}</DataTable.Cell>
                <DataTable.Cell style={styles.cellAcao}>
                    <View>
                        <Button
                            mode="text"
                            compact={true}
                            uppercase={false}
                            icon="playlist-check"
                            labelStyle={{ fontSize: 30 }}
                            color="#2C3E50"
                            onPress={() => navigation.navigate('Controle', { empresa: empresa })} >
                        </Button>
                    </View>
                    <View>
                        <Button
                            mode="text"
                            compact={true}
                            uppercase={false}
                            icon="file-import"
                            labelStyle={{ fontSize: 30 }}
                            color="#943126"
                            onPress={() => navigation.navigate('Importador', { controle: empresa })} >
                        </Button>
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
        )
    }

    return (
        <View style={styles.container}>
            <DataTable style={styles.datatable}>
                <DataTable.Header>
                    <DataTable.Title numeric style={styles.titleId}>ID</DataTable.Title>
                    <DataTable.Title style={styles.titleNome}>Nome</DataTable.Title>
                    <DataTable.Title style={styles.titleAcao}>Ação</DataTable.Title>
                </DataTable.Header>

                <ScrollView>
                    <View>
                        {elements.map((item, index) => renderDataItem(item, index))}
                    </View>
                </ScrollView>

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
            {
                visibleActivityIndicator &&
                <View style={styles.loading}  >
                    <ActivityIndicator color='#13B58C' />
                </View>
            }
        </View>
    )
}
