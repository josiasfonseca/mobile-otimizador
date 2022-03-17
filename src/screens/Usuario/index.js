import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'
import { getUsuarios } from '../../api/UsuarioService';

export default function Usuario({ navigation }) {

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };


  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searching, setSearching] = useState(false)
  const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)

  const [users, setUsers] = useState([])

  useEffect(async () => {
    await getApi()
  }, []);

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
    const result = await getUsuarios(page)
    setitemsPerPage(result.per_page)
    setTotalPages(result.last_page)
    setUsers(result.data)
    setSearching(false)
    setVisibleActivityIndicator(false)
  }

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
              onPress={() => navigation.navigate('UsuarioForm', { usuario: item })} />
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
          numberOfPages={totalPages + 1}
          onPageChange={(page) => updatePage(page)}
          label={page + " de " + totalPages}
          optionsPerPage={itemsPerPage}
          itemsPerPage={itemsPerPage}
          optionsLabel={'Por página'}
          showFastPaginationControls
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
            onStateChange={() => navigation.navigate('UsuarioForm', { usuario: {} })}
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
  )
}
