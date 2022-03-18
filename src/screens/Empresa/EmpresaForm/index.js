import React, { useState, useEffect } from 'react'
import {
  Button,
  Text,
  TextInput
} from 'react-native-paper';

import { View, ToastAndroid } from 'react-native'
import styles from './styles'
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native';

import { getCep } from '../../../api/SharedService';
import { insertEmpresa, updateEmpresa } from '../../../api/EmpresaService';

export default function EmpresaForm({ navigation, route }) {

  const empresa = {
    id: '',
    nome: '',
    razao_social: '',
    cnpj: '',
    ie: '',
    im: '',
    tipo: '',
    email: '',
    contato: '',
    telefone: '',
    whatsapp: '',
    cep: '',
    enderecp: '',
    numero: '',
    complemento: '',
    bairro: '',
    codigo_municipio: '',
    usuario_id: 1,
    cidade: '',
    uf: ''
    ,
  }

  const [company, setCompany] = useState(empresa)
  const [retorno, setRetorno] = useState(null)
  const [message, setMessage] = useState('')
  const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)

  const onChangeValueInput = (key, value) => {
    setCompany({ ...company, [key]: value })
  }

  useEffect(async () => {
    ToastAndroid.show(message, ToastAndroid.LONG)
    console.log('RETORNO: ', retorno, message)
    if (retorno == 200) {
      setCompany({ ...company })
      navigation.navigate('Empresa')
    }
  }, [retorno])

  useEffect(async () => {
    setVisibleActivityIndicator(true)
    setCompany({ ...company })
    const company_id = route.params
      && route.params.company
      && route.params.company.id_empresa
      ? route.params.company.id_empresa
      : null
    console.log('ROUTE PARAMS', company_id)
    if (company_id) {
      navigation.setOptions({ title: 'Edição de Empresa ID: ' + company_id })
      setCompany({ ...route.params.empresa })
    } else {
      navigation.setOptions({ title: 'Inclusão de Empresa' })
      setCompany({ ...company })
    }
    setVisibleActivityIndicator(false)
  }, [route.params.empresa])

  useEffect(async () => {
    if (company.cep.length == 8) {
      setVisibleActivityIndicator(true)
      const cepObj = await getCep(company.cep)
      const obj = {
        endereco: cepObj.logradouro,
        cidade: cepObj.localidade,
        codigo_municipio: cepObj.ibge,
        uf: cepObj.uf,
        bairro: cepObj.bairro
      }
      setCompany({ ...company, ...obj })
      setVisibleActivityIndicator(false)
    }
  }, [company.cep])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="ID"
              mode="outlined"
              maxLength={100}
              disabled={true}
              keyboardType='numeric'
              value={company.id_empresa ? company.id_empresa.toString() : ''}
              onChangeText={(text) => onChangeValueInput('id_empresa', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Nome"
              mode="outlined"
              maxLength={100}
              value={company.nome ? company.nome.toString() : ''}
              onChangeText={(text) => onChangeValueInput('nome', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Razao Social"
              mode="outlined"
              maxLength={100}
              value={company.razao_social ? company.razao_social.toString() : ''}
              onChangeText={(text) => onChangeValueInput('razao_social', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="CNPJ"
              mode="outlined"
              maxLength={100}
              value={company.cnpj ? company.cnpj.toString() : ''}
              onChangeText={(text) => onChangeValueInput('cnpj', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="IE"
              mode="outlined"
              maxLength={100}
              value={company.ie ? company.ie.toString() : ''}
              onChangeText={(text) => onChangeValueInput('ie', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="IM"
              mode="outlined"
              maxLength={100}
              value={company.im ? company.im.toString() : ''}
              onChangeText={(text) => onChangeValueInput('im', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Tipo"
              mode="outlined"
              maxLength={100}
              value={company.tipo ? company.tipo.toString() : ''}
              onChangeText={(text) => onChangeValueInput('tipo', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Email"
              mode="outlined"
              value={company.email ? company.email.toString() : ''}
              onChangeText={(text) => onChangeValueInput('email', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Telefone"
              mode="outlined"
              value={company.telefone ? company.telefone.toString() : ''}
              onChangeText={(text) => onChangeValueInput('telefone', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="WhatsApp"
              mode="outlined"
              value={company.whatsapp ? company.whatsapp.toString() : ''}
              onChangeText={(text) => onChangeValueInput('whatspapp', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="CEP"
              keyboardType='numeric'
              mode="outlined"
              value={company.cep.toString()}
              onChangeText={(text) => onChangeValueInput('cep', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Endereço"
              mode="outlined"
              value={company.endereco ? company.endereco.toString() : ''}
              onChangeText={(text) => onChangeValueInput('endereco', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Número"
              mode="outlined"
              value={company.numero ? company.numero.toString() : ''}
              onChangeText={(text) => onChangeValueInput('numero', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Complemento"
              mode="outlined"
              value={company.complemento ? company.complemento.toString() : ''}
              onChangeText={(text) => onChangeValueInput('complemento', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Bairro"
              mode="outlined"
              editable={false}
              value={company.bairro ? company.bairro.toString() : ''}
              onChangeText={(text) => onChangeValueInput('bairro', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Código do Munícpio"
              mode="outlined"
              editable={false}
              value={company.codigo_municipio ? company.codigo_municipio.toString() : ''}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Cidade"
              mode="outlined"
              editable={false}
              value={company.cidade ? company.cidade.toString() : ''}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="UF"
              mode="outlined"
              editable={false}
              value={company.uf ? company.uf.toString() : ''}
            />
          </View>
          <View style={styles.buttons}>
            <View style={styles.viewButtonCancelar}>
              <Button
                style={styles.buttonCancelar}
                icon="backspace"
                // labelStyle={{ fontSize: 15}}
                mode="contained"
                color="#B22222"
                onPress={() => ToastAndroid.show('Cancelar', ToastAndroid.LONG)}>
                Cancelar
              </Button>
            </View>
            <View style={styles.viewButtonSalvar}>
              <Button
                style={styles.buttonSalvar}
                icon="content-save"
                mode="contained"
                color="#3CB371"
                onPress={() => salvar()}>
                Salvar
              </Button>
            </View>
          </View>
          {
            visibleActivityIndicator &&
            <View style={styles.loading}  >
              <ActivityIndicator color='#13B58C' />
            </View>
          }
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}