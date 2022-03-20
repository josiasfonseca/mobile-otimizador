import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Button,
  HelperText,
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
import { TextInputMask } from 'react-native-masked-text';

export default function EmpresaForm({ navigation, route }) {

  const empresa = {
    id_empresa: '',
    nome: '',
    razao_social: '',
    cnpj: '',
    ie: '',
    im: '',
    tipo: 'S.N.',
    email: '',
    contato: '',
    telefone: '',
    whatsapp: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    codigo_municipio: '',
    usuario_id: 1,
    cidade: '',
    uf: '',
  }

  const [company, setCompany] = useState(empresa)
  const [retorno, setRetorno] = useState(null)
  const [message, setMessage] = useState('')
  const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
  const [errors, setErrors] = useState(false)

  const onChangeValueInput = (key, value) => {
    setCompany({ ...company, [key]: value })
    validaCampos()
  }

  const validaCampos = async () => {
    setErrors(false)
    if (company.nome.length < 1)
      setErrors(true)
  }

  useEffect(async () => {
    validaCampos()
  }, [])

  useEffect(async () => {
    setVisibleActivityIndicator(true)
    setCompany({ ...company })
    const company_id = route.params
      && route.params.empresa
      && route.params.empresa.id_empresa
      ? route.params.empresa.id_empresa
      : null
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
    if (company.cep.length >= 9) {
      setVisibleActivityIndicator(true)
      const cepObj = await getCep(company.cep)
      if (!cepObj.cep) {
        ToastAndroid.show('CEP Inválido', ToastAndroid.LONG)
        setCompany({ ...company })
      } else {
        const obj = {
          endereco: cepObj.logradouro,
          cidade: cepObj.localidade,
          codigo_municipio: cepObj.ibge,
          uf: cepObj.uf,
          bairro: cepObj.bairro
        }
        setCompany({ ...company, ...obj })
      }
      setVisibleActivityIndicator(false)
    }
  }, [company.cep])

  const salvar = async () => {
    await validaCampos()
    if (errors) {
      ToastAndroid.show('Verifique os campos em vermelho.', ToastAndroid.LONG)
      return
    }
    if (company.usuario)
      delete company.usuario

    if (!company.id_empresa || company.id_empresa == '') {
      setVisibleActivityIndicator(true)
      setCompany({ ...company, id_empresa: '' })
      await insertEmpresa(company)
        .then(res => {
          ToastAndroid.show('Cadastro efetuado com sucesso!', ToastAndroid.LONG)
          setRetorno(res.status)
          setCompany({ ...empresa })
          setVisibleActivityIndicator(false)
          navigation.navigate('Empresa', { atualizar: 'S'})
        })
        .catch(err => {
          setMessage(JSON.stringify(err.message ?? err))
        })

    } else {
      delete company.created_at
      delete company.deleted_at
      delete company.updated_at
      setCompany({ ...company, updated_at: '', created_at: '' })
      await updateEmpresa(company.id_empresa, company)
        .then(res => {
          ToastAndroid.show('Cadastro atualizado com sucesso!', ToastAndroid.LONG)
          setRetorno(res)
          setCompany({ ...empresa })
          setVisibleActivityIndicator(false)
          navigation.navigate('Empresa', { atualizar: 'S'})
        })
        .catch(err => {
          setMessage(JSON.stringify(err.message ?? err))
        })

      setVisibleActivityIndicator(false)
    }
  }

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
              maxLength={20}
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
              maxLength={45}
              minLength={2}
              value={company.nome ? company.nome.toString() : ''}
              onChangeText={(text) => onChangeValueInput('nome', text)}
            />

            {company.nome.length < 1 &&
              <HelperText type="error" visible={company.nome.length < 1}>
                Nome é obrigatório
              </HelperText>}
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Razao Social"
              mode="outlined"
              maxLength={150}
              value={company.razao_social ? company.razao_social.toString() : ''}
              onChangeText={(text) => onChangeValueInput('razao_social', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              keyboardType='numeric'
              mode="outlined"
              label="CNPJ"
              value={company.cnpj ? company.cnpj.toString() : ''}
              render={(props) => (
                <TextInputMask
                  maxLength={18}
                  {...props}
                  type={'cnpj'}
                  onChangeText={(text) => onChangeValueInput('cnpj', text)}
                />
              )}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="IE"
              keyboardType='numeric'
              mode="outlined"
              maxLength={20}
              value={company.ie ? company.ie.toString() : ''}
              onChangeText={(text) => onChangeValueInput('ie', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              keyboardType='numeric'
              label="IM"
              mode="outlined"
              maxLength={20}
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
              keyboardType='email-address'
              label="Email"
              mode="outlined"
              maxLength={100}
              value={company.email ? company.email.toString() : ''}
              onChangeText={(text) => onChangeValueInput('email', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Contato"
              mode="outlined"
              maxLength={100}
              value={company.contato ? company.contato.toString() : ''}
              onChangeText={(text) => onChangeValueInput('contato', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Telefone"
              value={company.telefone ? company.telefone.toString() : ''}
              mode="outlined"
              render={(props) => (
                <TextInputMask
                  maxLength={30}
                  {...props}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  onChangeText={(text) => onChangeValueInput('telefone', text)}
                />
              )}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="WhatsApp"
              value={company.whatsapp ? company.whatsapp.toString() : ''}
              mode="outlined"
              render={(props) => (
                <TextInputMask
                  maxLength={30}
                  {...props}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  onChangeText={(text) => onChangeValueInput('whatsapp', text)}
                />
              )}
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
              value={company.cep ? company.cep.toString() : ''}
              render={(props) => (
                <TextInputMask
                  maxLength={9}
                  {...props}
                  type={'zip-code'}
                  onChangeText={(text) => onChangeValueInput('cep', text)}
                />
              )}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Endereço"
              mode="outlined"
              maxLength={150}
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
              maxLength={10}
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
              maxLength={50}
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
              maxLength={50}
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
              maxLength={8}
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
              maxLength={150}
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
              maxLength={2}
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