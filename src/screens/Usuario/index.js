import React, { useEffect, useState } from 'react'
import { Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'
import { getUsuarios } from '../../api/UsuarioService';

export default function Usuario({ navigation }) {

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const optionsPerPage = [2, 3, 4];

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [users, setUsers] = useState([])
  const teste = []

  useEffect(async () => {
    setPage(0);
    const result = await getUsuarios()
    // console.log('Busca uusario', result.data)
    setUsers(result.data)
  }, []);
  
  const elements = []
  const toRenderItems = async () => {
    for (let i = 0; i < users.length; i++) {
      elements.push(users[i])
    }
  }
  toRenderItems()
  
  function renderDataItem(item, index) {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell numeric style={styles.cellId}>{item.id_usuario}</DataTable.Cell>
        <DataTable.Cell style={styles.cellNome}>{item.nome}</DataTable.Cell>
        <DataTable.Cell style={styles.cellAcao}>
          <View style={styles.viewButtonEdit}>
            <Button
              mode="text"
              compact={true}
              icon="pencil"
              style={styles.buttonEdit}
              labelStyle={{ fontSize: 30 }}
              color="blue"
              onPress={() => navigation.navigate('UsuarioEdit', { usuario: item })} />
          </View>
          <View style={styles.viewButtonDelete}>
            <Button
              mode="text"
              compact={true}
              icon="trash-can"
              style={styles.buttonDelete}
              labelStyle={{ fontSize: 30 }}
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
          optionsLabel={'Por página'}
        />
      </DataTable>
      <Provider>
      <Portal>
        <FAB.Group
          open={false}
          icon={true ? 'plus' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
          ]}
          onStateChange={() => navigation.navigate('UsuarioEdit', {  usuario: {}})}
        />
      </Portal>
    </Provider>
    </View>
  )
}
