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
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text';
import { insertControle, updateControle } from '../../../api/ControleService';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

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

    const opcoes = [
        {
            name: "Opções",
            id: 0,
            children: [
                { id: 1, name: 'OK' }, { id: 2, name: 'Erro' }
            ]
        }
    ]

    const [control, setControl] = useState(controle)
    const [retorno, setRetorno] = useState(null)
    const [message, setMessage] = useState('')
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [errors, setErrors] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({})
    const [mesSelected, setMesSelected] = useState([])

    const onChangeValueInput = (key, value) => {
        setControl({ ...control, [key]: value })
        validaCampos()
    }

    const validaCampos = async () => {
        setErrors(false)
        if (control.ano.length < 1)
            setErrors(true)
    }

    const onSelectedMesChange = (selectedItem, mes) => {
        console.log('SELECTED ITEM: ',selectedItem[0],mes, opcoes[0].children[selectedItem[0] - 1])
        const selectedOption = opcoes[0].children[selectedItem[0] - 1]
        setControl({...control, [mes]: selectedOption.name})
        // setMesSelected(selectedItem)
        console.log(control)
    };

    function updateModal(item, value) {
        setVisibleModal(value)
        setItemSelected(item)
    }

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
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e, 'jan')}
                                // selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewSelectText}>
                            <Text>JAN</Text>
                        </View>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={opcoes}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Opcao"
                                // showDropDowns={true}
                                expandDropDowns
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedMesChange(e)}
                                selectedItems={mesSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Mes"
                                confirmText="Confirmar"
                            />
                        </View>
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