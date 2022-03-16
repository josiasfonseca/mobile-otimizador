import React, { useState } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import styles from './styles'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-paper';

const ModalControle = ({ setModal, visibleModal, dados }) => {

    const [itemSelected, setItemSelected] = useState([])
    const status = [
        {
            name: "Opções",
            id: 0,
            children: [
                { id: 1, name: 'OK' }, { id: 2, name: 'ERRO' }
            ]
        }
    ]

    onSelectedItemsChange = (selectedItem) => {
        setItemSelected(selectedItem)
    };

    function onCancel() {
        setModal(false)
    }

    function onConfirm() {
        if (itemSelected.length == 0)
            Alert.alert("Selecione uma opção!")
        else
            setModal(false)
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModal}
                onRequestClose={() => setModal(!visibleModal)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{dados["id"]} - Mês: {dados["mes"]}</Text>
                        <View style={styles.viewSelect}>
                            <SectionedMultiSelect
                                items={status}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Escolha o status..."
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                onSelectedItemsChange={e => onSelectedItemsChange(e)}
                                selectedItems={itemSelected}
                                showCancelButton
                                single
                                searchPlaceholderText="Status"
                                confirmText="Confirmar"
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
                </View>
            </Modal>
        </View>
    );
};

export default ModalControle
