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
import { VirtualizedList } from 'react-native';
import { insertControle, updateControle } from '../../../api/ControleService';
import SelectBox from 'react-native-multi-selectbox'
import { ScrollView } from 'react-native-gesture-handler';
// import { LogBox } from 'react-native'

export default function ControleForm({ navigation, route }) {

    const controle = {
        id_controle: '',
        jan: '',
        fev: '',
        mar: '',
        abr: '',
        mai: '',
        jun: '',
        jul: '',
        ago: '',
        set: '',
        out: '',
        nov: '',
        dez: '',
        ano: '',
        empresa_id: 1
    }

    const meses = [
        { nome: 'jan', label: 'JANEIRO' },
        { nome: 'fev', label: 'FEVEREIRO' },
        { nome: 'mar', label: 'MARÇO' },
        { nome: 'abr', label: 'ABRIL' },
        { nome: 'mai', label: 'MAIO' },
        { nome: 'jun', label: 'JUNHO' },
        { nome: 'jul', label: 'JULHO' },
        { nome: 'ago', label: 'AGOSTO' },
        { nome: 'set', label: 'SETEMBRO' },
        { nome: 'out', label: 'OUTUBRO' },
        { nome: 'nov', label: 'NOVEMBRO' },
        { nome: 'dez', label: 'DEZEMBRO' },
    ]
    const opcoes = [
        { id: 1, item: 'OK' },
        { id: 2, item: 'X' }
    ]


    const [control, setControl] = useState(controle)
    const [retorno, setRetorno] = useState(null)
    const [message, setMessage] = useState('')
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [errors, setErrors] = useState(false)

    const onChangeValueInput = (key, value) => {
        setControl({ ...control, [key]: value })
        validaCampos()
    }

    const validaCampos = async () => {
        setErrors(false)
        if (control.ano.length < 1)
            setErrors(true)
    }

    function onChange(value, mes) {
        setControl({ ...control, [mes.nome]: value.item })
    }

    function getValueSelect (value) {
        const ret = opcoes.filter(e => e.item == control[value.nome])
        return ret[0]
    }
    
    const Item = ({ mes, index }) => (
        <View style={{ width: '100%' }} key={index}>
            <SelectBox
                style={{ with: '100%' }}
                label={mes.label}
                options={opcoes}
                value={ { ...getValueSelect(mes) } }
                onChange={(e) => onChange(e, mes)}
                hideInputFilter={true}
                inputPlaceholder="Opção..."
                labelStyle={{ fontSize: 15, marginLeft: 5 }}
                containerStyle={{ backgroundColor: '#ccc', borderRadius: 10 }}
                optionsLabelStyle={{ fontSize: 20, color: '#000', backgroundColor: '#eee' }}
                selectedItemStyle={{ backgroundColor: '#ccc', fontSize: 15, color: getValueSelect(mes) && getValueSelect(mes).item == 'X' 
                                                                                                ? 'red' 
                                                                                                : '#020', marginLeft: 10 }}
            />
        </View>
    );

    useEffect(async () => {
        validaCampos()
    }, [])

    useEffect(async () => {
        setVisibleActivityIndicator(true)
        setControl({ ...control })
        const control_id = route.params
            && route.params.controle
            && route.params.controle.id_controle
            ? route.params.controle.id_controle
            : null
        console.log('CONTROL: ', control_id)
        if (control_id) {
            navigation.setOptions({ title: 'Edição de Controle ID: ' + control_id })
            setControl({ ...route.params.controle })
        } else {
            navigation.setOptions({ title: 'Inclusão de Controle' })
            setControl({ ...control })
        }
        setVisibleActivityIndicator(false)
        console.log(control)
    }, [route.params.controle])

    const salvar = async () => {
        await validaCampos()
        if (errors) {
            ToastAndroid.show('Verifique os campos em vermelho.', ToastAndroid.LONG)
            return
        }

        if (!control.id_controle || control.id_controle == '') {
            setVisibleActivityIndicator(true)
            setControl({ ...control, id_controle: '' })
            await insertControle(control)
                .then(res => {
                    ToastAndroid.show('Cadastro efetuado com sucesso!', ToastAndroid.LONG)
                    setRetorno(res.status)
                    setControl({ ...control })
                    setVisibleActivityIndicator(false)
                    navigation.navigate('Controle', { atualizar: 'S' })
                })
                .catch(err => {
                    setMessage(JSON.stringify(err.message ?? err))
                })

        } else {
            delete control.created_at
            delete control.deleted_at
            delete control.updated_at
            await updateControle(control.id_controle, control)
                .then(res => {
                    ToastAndroid.show('Cadastro atualizado com sucesso!', ToastAndroid.LONG)
                    setRetorno(res)
                    setControl({ ...control })
                    setVisibleActivityIndicator(false)
                    navigation.navigate('Controle', { atualizar: 'S' })
                })
                .catch(err => {
                    setMessage(JSON.stringify(err.message ?? err))
                })

            setVisibleActivityIndicator(false)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                    {/* <Text> {getValueSelect(control.jan)} </Text> */}
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
                            value={control.id_controle ? control.id_controle.toString() : ''}
                            onChangeText={(text) => onChangeValueInput('id_controle', text)}
                        />
                    </View>
                    <View style={styles.inputText}>
                        <TextInput
                            dense
                            activeOutlineColor="#0e0e0e"
                            placeholderTextColor="#cccccc"
                            label="Ano"
                            mode="outlined"
                            keyboardType='numeric'
                            maxLength={4}
                            disabled={true}
                            minLength={4}
                            value={control.ano ? control.ano.toString() : ''}
                            onChangeText={(text) => onChangeValueInput('ano', text)}
                        />

                        {control.ano.length < 4 &&
                            <HelperText type="error" visible={control.ano.length < 4}>
                                Ano é obrigatório
                            </HelperText>}
                    </View>
                    <View style={styles.inputSelect}>
                        <ScrollView horizontal={true} style={{ flexDirection: 'column' }} >
                            <View style={{ width: '100%' }}>
                                {
                                    meses.map((mes, index) => <Item mes={mes} index={index} key={index} />)
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.viewButtonCancelar}>
                            <Button
                                style={styles.buttonCancelar}
                                icon="backspace"
                                // labelStyle={{ fontSize: 15}}
                                mode="contained"
                                color="#B22222"
                                onPress={() =>navigation.navigate('Controle', { atualizar: 'S' })}>
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
        </TouchableWithoutFeedback >
    )
}