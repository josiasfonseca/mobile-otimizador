import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'
import { getEmpresas } from '../../api/EmpresaService';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteEmpresa } from '../../api/EmpresaService';
import { Alert } from 'react-native';

export default function Empresa({ navigation, route }) {

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };
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
    if (route.params && route.params.atualizar && route.params.atualizar == 'S')
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

  const confirmToDeleteCompany = async (u) => {
    Alert.alert(
      "Exclusão",
      "Confima exclusão da empresa " + u.id_empresa + ' ?',
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteCompany(u.id_empresa) }
      ]
    );
  }

  const deleteCompany = async(id) => {
    setVisibleActivityIndicator(true)
    await deleteEmpresa(id)
    .then(async res => {
      ToastAndroid.show(`Empresa ${id} excluída com sucesso!`, ToastAndroid.LONG)
      await getApi()
    })
    .catch(err => {
      ToastAndroid.show(`Erro de exclusão! ${JSON.stringify(err)}`, ToastAndroid.LONG)
    })
    setVisibleActivityIndicator(false)
  }
  

  const elements = []
  const toRenderItems = async () => {
    for (let i = 0; i < companies.length; i++) {
      elements.push(companies[i])
    }
  }
  toRenderItems()

  function renderDataItem(emp, index) {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell numeric style={styles.cellId}>{emp.id_empresa}</DataTable.Cell>
        <DataTable.Cell style={styles.cellNome}>{emp.nome}</DataTable.Cell>
        <DataTable.Cell style={styles.cellAcao}>
          <View style={styles.viewButtonEdit}>
            <Button
              mode="text"
              compact={true}
              icon="pencil"
              style={styles.buttonEdit}
              labelStyle={{ fontSize: 30 }}
              color="#2C3E50"
              onPress={() => navigation.navigate('EmpresaForm', { empresa: emp })} />
          </View>
          <View style={styles.viewButtonDelete}>
            <Button
              mode="text"
              compact={true}
              icon="trash-can-outline"
              style={styles.buttonDelete}
              labelStyle={{ fontSize: 30 }}
              color="#943126"
              onPress={() => confirmToDeleteCompany(emp)} />
          </View>
        </DataTable.Cell>
      </DataTable.Row>
    )
  }

  return (
    <View style={styles.container} >
      <DataTable style={styles.datatable}>
        <DataTable.Header>
          <DataTable.Title numeric style={styles.titleId}>ID</DataTable.Title>
          <DataTable.Title style={styles.titleNome}>Nome</DataTable.Title>
          <DataTable.Title style={styles.titleAcao}>Ação</DataTable.Title>
        </DataTable.Header>

        <ScrollView style={styles.scrollView}>
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
      <Provider>
        <Portal>
          <FAB
            style={styles.fab}
            open={false}
            icon='plus'
            color="#fff"
            onPress={() => navigation.navigate('EmpresaForm', { empresa: {} })}
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
