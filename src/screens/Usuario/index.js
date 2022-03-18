import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'
import { getUsuarios } from '../../api/UsuarioService';
import { ScrollView } from 'react-native-gesture-handler';

export default function Usuario({ navigation }) {

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };


  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
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
              color="#2C3E50"
              onPress={() => navigation.navigate('UsuarioForm', { usuario: item })} />
          </View>
          <View style={styles.viewButtonDelete}>
            <Button
              mode="text"
              compact={true}
              icon="trash-can-outline"
              style={styles.buttonDelete}
              labelStyle={{ fontSize: 30 }}
              color="#943126"
              onPress={() => showToast('Delete')} />
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
          label={page + " de " + totalPages}
          optionsPerPage={itemsPerPage}
          itemsPerPage={itemsPerPage}
          optionsLabel={'Por página'}
          showFastPaginationControls
        />
      </DataTable>
      <Provider>
        <Portal>
          <FAB
            style={styles.fab}
            open={false}
            icon='plus'
            color="#fff"
            onPress={() => navigation.navigate('UsuarioForm', { usuario: {} })}
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
