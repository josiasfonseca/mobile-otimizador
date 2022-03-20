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
import { insertUsuario, updateUsuario } from '../../../api/UsuarioService';
import { TextInputMask } from 'react-native-masked-text';

export default function UsuarioForm({ navigation, route }) {

  const usuario = {
    id_usuario: '', nome: '', login: '', senha: '', cpf: '', email: '', telefone: '', whatsapp: '', cep: '', endereco: '', numero: '', complemento: '',
    bairro: '', cidade: '', uf: '', tipo_usuario_id: 1
  }

  const [user, setUser] = useState(usuario)
  const [retorno, setRetorno] = useState(null)
  const [message, setMessage] = useState('')
  const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
  const [isSecureTextEntry, setIssecureTextEntry] = useState(true)
  const [errors, setErrors] = useState(false)

  const onChangeValueInput = (key, value) => {
    setUser({ ...user, [key]: value })
    validaCampos()
  }

  const validaCampos = async () => {
    setErrors(false)
    if (user.nome.length < 1)
      setErrors(true)
    if (user.login.length < 1)
      setErrors(true)

    if (user.id_usuario == '') {
      if (user.senha == '' || user.senha.length < 6) {
        setErrors(true)
      }
    }

  }
  useEffect(async () => {
    validaCampos()
  }, [])

  const toogleIsSecureTextEntry = async () => {
    setIssecureTextEntry(!isSecureTextEntry)
  }

  useEffect(async () => {
    setVisibleActivityIndicator(true)
    setUser({ ...usuario })
    const usuario_id = route.params
      && route.params.usuario
      && route.params.usuario.id_usuario
      ? route.params.usuario.id_usuario
      : null
    if (usuario_id) {
      navigation.setOptions({ title: 'Edição de Usuário ID: ' + usuario_id })
      setUser({ ...route.params.usuario })
    } else {
      navigation.setOptions({ title: 'Inclusão de Usuário' })
      setUser({ ...usuario })
    }
    setVisibleActivityIndicator(false)
  }, [route.params.usuario])

  useEffect(async () => {
    if (user.cep.length >= 9) {
      setVisibleActivityIndicator(true)
      const cepObj = await getCep(user.cep)
      if (!cepObj.cep) {
        ToastAndroid.show('CEP Inválido', ToastAndroid.LONG)
        setUser({ ...user })
      } else {
        const obj = {
          endereco: cepObj.logradouro,
          cidade: cepObj.localidade,
          codigo_municipio: cepObj.ibge,
          uf: cepObj.uf,
          bairro: cepObj.bairro
        }

        setUser({ ...user, ...obj })
      }
      setVisibleActivityIndicator(false)
    }
  }, [user.cep])

  const salvar = async () => {
    await validaCampos()
    if (errors) {
      ToastAndroid.show('Verifique os campos em vermelho.', ToastAndroid.LONG)
      return
    }
    if (user.tipo_usuario)
      delete user.tipo_usuario

    if (!user.id_usuario || user.id_usuario == '') {
      setVisibleActivityIndicator(true)
      setUser({ ...user, id_usuario: '' })
      await insertUsuario(user)
        .then(res => {
          ToastAndroid.show('Cadastro efetuado com sucesso!', ToastAndroid.LONG)
          setRetorno(res.status)
          setUser({ ...usuario })
          setVisibleActivityIndicator(false)
          navigation.navigate('Usuario', { atualizar: 'S'})
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
          ToastAndroid.show('Cadastro atualizado com sucesso!', ToastAndroid.LONG)
          setRetorno(res)
          setUser({ ...usuario })
          setVisibleActivityIndicator(false)
          navigation.navigate('Usuario', { atualizar: 'S'})

        })
        .catch(err => {
          setMessage(JSON.stringify(err.message ?? err))
        })

      setVisibleActivityIndicator(false)
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
              maxLength={45}
              minLength={2}
              value={user.nome ? user.nome.toString() : ''}
              onChangeText={(text) => onChangeValueInput('nome', text)}
            />

            {user.nome.length < 1 &&
              <HelperText type="error" visible={user.nome.length < 1}>
                Nome é obrigatório
              </HelperText>}
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              maxLength={20}
              minLength={6}
              label="Login"
              mode="outlined"
              value={user.login ? user.login.toString() : ''}
              onChangeText={(text) => onChangeValueInput('login', text.toLocaleLowerCase())}
            />
            {user.login.length < 1 &&
              <HelperText type="error" visible={user.login.length < 1}>
                Login é obrigatório
              </HelperText>}
          </View>
          <View style={styles.inputText}>
            <TextInput
              maxLength={20}
              minLength={6}
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              secureTextEntry={isSecureTextEntry}
              right={<TextInput.Icon name={isSecureTextEntry ? 'eye' : 'eye-off'} onPress={() => toogleIsSecureTextEntry()} />}
              label="Senha"
              editable={user && user.id_usuario && user.id_usuario != '' ? false : true}
              mode="outlined"
              value={user.senha ? user.senha.toString() : ''}
              onChangeText={(text) => onChangeValueInput('senha', text)}
            />
            {user.id_usuario == '' &&
              <Text>
                {user.senha.length < 6 &&
                  <HelperText type="error" visible={user.senha.length < 6}>
                    {user.senha.length < 1 && ' Senha é obrigatório '} {user.senha.length < 6 && ' Min. 6 caracteres'}
                  </HelperText>}
              </Text>}
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              keyboardType='numeric'
              mode="outlined"
              label="CPF"
              value={user.cpf ? user.cpf.toString() : ''}
              render={(props) => (
                <TextInputMask
                  maxLength={14}
                  {...props}
                  type={'cpf'}
                  onChangeText={(text) => onChangeValueInput('cpf', text)}
                />
              )}
            />
          </View>
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Email"
              keyboardType='email-address'
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
              value={user.telefone ? user.telefone.toString() : ''}
              mode="outlined"
              render={(props) => (
                <TextInputMask
                  maxLength={15}
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
              value={user.whatsapp ? user.whatsapp.toString() : ''}
              mode="outlined"
              render={(props) => (
                <TextInputMask
                  maxLength={15}
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
              value={user.cep.toString()}
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
          {
            visibleActivityIndicator &&
            <View style={styles.loading}  >
              <ActivityIndicator color='#13B58C' />
            </View>
          }
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  )
}