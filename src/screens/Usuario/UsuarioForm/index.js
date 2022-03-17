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
import { insertUsuario, updateUsuario } from '../../../api/UsuarioService';

export default function UsuarioForm({ navigation, route }) {

  const usuario = {
    id_usuario: '', nome: '', login: '', senha: '', cpf: '', email: '', telefone: '', whatsapp: '', cep: '', endereco: '', numero: '', complemento: '',
    bairro: '', cidade: '', uf: '', tipo_usuario_id: 1
  }
  const [user, setUser] = useState(usuario)
  const [retorno, setRetorno] = useState(null)
  const [message, setMessage] = useState('')

  const onChangeValueInput = (key, value) => {
    setUser({ ...user, [key]: value })
  }

  useEffect(async () => {
    ToastAndroid.show(message, ToastAndroid.LONG)
    console.log('RETORNO: ', retorno, message)
    if (retorno == 200) {
      setUser({ ...usuario })
      navigation.navigate('Usuario')
    }
  }, [retorno])

  useEffect(async () => {
    setUser({ ...usuario })
    const usuario_id = route.params
      && route.params.usuario
      && route.params.usuario.id_usuario
      ? route.params.usuario.id_usuario
      : null
    console.log('ROUTE PARAMS', usuario_id)
    if (usuario_id) {
      navigation.setOptions({ title: 'Edição de Usuário ID: ' + usuario_id })
      setUser({ ...route.params.usuario })
    } else {
      navigation.setOptions({ title: 'Inclusão de Usuário' })
      setUser({ ...usuario })
    }
  }, [route.params.usuario])

  useEffect(async () => {
    if (user.cep.length == 8) {
      const cepObj = await getCep(user.cep)
      const obj = {
        endereco: cepObj.logradouro,
        cidade: cepObj.localidade,
        codigo_municipio: cepObj.ibge,
        uf: cepObj.uf,
        bairro: cepObj.bairro
      }
      setUser({ ...user, ...obj })
    }
  }, [user.cep])

  const salvar = async () => {

    if (!user.id_usuario) {
      if (user.tipo_usuario)
        delete user.tipo_usuario
      setUser({ ...user, id_usuario: '' })
      await insertUsuario(user)
        .then(res => {
          console.log(res)
          setMessage('Cadastro efetuado com sucesso!')
          setRetorno(res)
        })
        .catch(err => {
          setMessage(JSON.stringify(err.message ?? err))
        })

    } else {
      delete user.created_at
      delete user.deleted_at
      delete user.updated_at
      setUser({ ...user, updated_at: '', created_at: '' })
      await updateUsuario(user.id_usuario, user)
        .then(res => {
          console.log(res)
          setMessage('Cadastro atualizado com sucesso!')
          setRetorno(res)
        })
        .catch(err => {
          setMessage(JSON.stringify(err.message ?? err))
        })
    }

    ToastAndroid.show(message, ToastAndroid.LONG)
    console.log('RETORNO: ', retorno, message)
    if (retorno == 200) {
      setUser({ ...usuario })
      navigation.navigate('Usuario')
    }
  }
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   onPress={Keyboard.dismiss}
    // >
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
              value={user.id_usuario ? user.id_usuario.toString() : ''}
              onChangeText={(text) => onChangeValueInput('id_usuario', text)}
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
              value={user.nome ? user.nome.toString() : ''}
              onChangeText={(text) => onChangeValueInput('nome', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Login"
              mode="outlined"
              value={user.login ? user.login.toString() : ''}
              onChangeText={(text) => onChangeValueInput('login', text.toLocaleLowerCase())}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              secureTextEntry
              right={<TextInput.Icon name="eye" />}
              label="Senha"
              editable={user && user.id_usuario && user.id_usuario != '' ? false : true}
              mode="outlined"
              value={user.senha ? user.senha.toString() : ''}
              onChangeText={(text) => onChangeValueInput('senha', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="CPF"
              keyboardType='numeric'
              mode="outlined"
              value={user.cpf ? user.cpf.toString() : ''}
              onChangeText={(text) => onChangeValueInput('cpf', text)}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Email"
              mode="outlined"
              value={user.email ? user.email.toString() : ''}
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
              value={user.telefone ? user.telefone.toString() : ''}
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
              value={user.whatsapp ? user.whatsapp.toString() : ''}
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
              value={user.cep.toString()}
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
              value={user.endereco ? user.endereco.toString() : ''}
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
              value={user.numero ? user.numero.toString() : ''}
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
              value={user.complemento ? user.complemento.toString() : ''}
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
              value={user.bairro ? user.bairro.toString() : ''}
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
              value={user.codigo_municipio ? user.codigo_municipio.toString() : ''}
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
              value={user.cidade ? user.cidade.toString() : ''}
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
              value={user.uf ? user.uf.toString() : ''}
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
                // labelStyle={{ fontSize: 15 }}
                mode="contained"
                color="#3CB371"
                onPress={() => salvar()}>
                Salvar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  )
}