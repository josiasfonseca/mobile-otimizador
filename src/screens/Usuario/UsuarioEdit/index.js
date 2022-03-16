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
export default function Usuario({ navigation, route }) {

  const usuario = {
    id: '', nome: '', login: '', password: '', cpf: '', email: '', telefone: '', whatsapp: '', cep: '', endereco: '', numero: '', complemento: '',
    bairro: '', cidade: '', uf: ''
  }
  const [user, setUser] = useState(usuario)

  const onChangeValueInput = (key, value) => {
    setUser({ ...user, [key]: value })
  }
  useEffect(async () => {
    console.log(route.params.usuario)
    if(route.params && route.params.usuario.id_usuario ) {
      if(route.params.usuario.id_usuario) {
        setUser({ ...route.params.usuario })
        console.log(route.params.usuario)
      } else {
        setUser({ ...usuario })
      }
    }
  }, [route.params.usuario])

  useEffect(async () => {
    if (user.cep.length == 8) {
      const cepObj = await getCep(user.cep)
      setUser({ ...user, ...cepObj })
    }
  }, [user.cep])

  const getValueInitital = async (key) => {
    const retorno = user[key] ? user[key].toString() : 'ss'
    // console.log(retorno, typeof(retorno))
    return retorno
  }

  const salvar = async () => {

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
              value={JSON.stringify(user.id_usuario)}
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
              value={user.nome.toString()}
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
              value={user.login.toString()}
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
              editable={user && user.id_usuario ? false : true}
              mode="outlined"
              value={user.password ? user.password.toString() : ''}
              onChangeText={(text) => onChangeValueInput('password', text)}
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
              value={user.cpf.toString()}
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
              value={user.email.toString()}
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
              value={user.telefone.toString()}
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
              value={user.whatsapp.toString()}
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
              editable={false}
              value={user.logradouro ? user.logradouro.toString() : ''}
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
          <View style={styles.inputText}>
            <TextInput
              dense
              activeOutlineColor="#0e0e0e"
              placeholderTextColor="#cccccc"
              label="Código do Munícpio"
              mode="outlined"
              editable={false}
              value={user.ibge ? user.ibge.toString() : ''}
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
              value={user.localidade ? user.localidade.toString() : ''}
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
                onPress={() => ToastAndroid.show('Salvar', ToastAndroid.LONG)}>
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