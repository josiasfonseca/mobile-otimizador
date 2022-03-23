import React, { useEffect } from 'react'
import { Button, DataTable } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'

export default function Home({ navigation }) {

    const optionsPerPage = [2, 3, 4];

    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    useEffect(() => {
        setPage(1);
    }, [itemsPerPage]);

    const companies = [
        {
            id_empresa: '1',
            email: 'joao@ifpr.edu.br',
            nome: 'ROMAGUERA-CORKERY',
        },
        {
            id_empresa: '2',
            email: 'GREENFELDER-CARTWRIGHT',
            nome: 'GREENFELDER-CARTWRIGHT',
        },
        {
            id_empresa: '3',
            email: 'joana@ifpr.edu.br',
            nome: 'HILPERT-MAGGIO',
        },
        {
            id_empresa: '4',
            email: 'joana@ifpr.edu.br',
            nome: 'TORP GROUP',
        },
        {
            id_empresa: '5',
            email: 'joana@ifpr.edu.br',
            nome: 'MORAR, KOHLER AND CRUICKSHANK',
        },
        {
            id_empresa: '6',
            email: 'joana@ifpr.edu.br',
            nome: 'HAMMES-DECKOW',
        },
        {
            id_empresa: '7',
            email: 'joana@ifpr.edu.br',
            nome: 'DOYLE-JOHNSTON',
        },
        {
            id_empresa: '8',
            email: 'joana@ifpr.edu.br',
            nome: 'LABADIE, CRUICKSHANK AND HOWE',
        },
        {
            id_empresa: '9',
            email: 'joana@ifpr.edu.br',
            nome: 'BLANDA-MACEJKOVIC',
        },
        {
            id_empresa: '10',
            email: 'joana@ifpr.edu.br',
            nome: 'BERNHARD INC',
        },
        {
            id_empresa: '11',
            email: 'joana@ifpr.edu.br',
            nome: 'DARE-GAYLORD3',
        },
        {
            id_empresa: '12',
            email: 'joana@ifpr.edu.br',
            nome: 'KULAS-MCDERMOTT',
        },
        {
            id_empresa: '13',
            email: 'joana@ifpr.edu.br',
            nome: 'ZIEMANN-ZBONCAK',
        },

    ];

    const elements = []
    for (let i = 0; i < companies.length; i++) {
        elements.push(companies[i])
    }

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
                            onPress={() => navigation.navigate('Controle', { empresa: empresa})} >
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
                            onPress={() => navigation.navigate('Importador',  { controle: empresa})} >
                        </Button>
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
        )
    }

    return (
        <View style={styles.container}>
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
        </View>
    )
}
