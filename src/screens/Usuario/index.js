import React, { useEffect } from 'react'
import { Button, DataTable } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'

export default function Usuario({ navigation }) {

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const optionsPerPage = [2, 3, 4];

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const users = [
    {
      id: '1',
      email: 'joao@ifpr.edu.br',
      nome: 'Usuario Teste a 1',
    },
    {
      id: '2',
      email: 'maria@ifpr.edu.br',
      nome: 'Usuario Teste a 2',
    },
    {
      id: '3',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '4',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '5',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '6',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '7',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '8',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '9',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '10',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '11',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '12',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },
    {
      id: '13',
      email: 'joana@ifpr.edu.br',
      nome: 'Usuario Teste a 3',
    },

  ];

  const elements = []
  for (let i = 0; i < users.length; i++) {
    elements.push(users[i])
  }

  function renderDataItem(item, index) {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell numeric style={styles.cellId}>{item.id}</DataTable.Cell>
        <DataTable.Cell style={styles.cellNome}>{item.nome}</DataTable.Cell>
        <DataTable.Cell style={styles.cellAcao}>
          <View style={styles.viewButtonEdit}>
            <Button
              mode="text"
              compact={true}
              icon="account-edit"
              style={styles.buttonEdit}
              labelStyle={{ fontSize: 30 }}
              color="blue"
              onPress={() => navigation.navigate('UsuarioEdit')} />
          </View>
          <View style={styles.viewButtonDelete}>
            <Button
              mode="text"
              compact={true}
              icon="trash-can"
              style={styles.buttonDelete}
              labelStyle={{ fontSize: 30}}
              color="red"
              onPress={() => showToast('Delete')} />
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
