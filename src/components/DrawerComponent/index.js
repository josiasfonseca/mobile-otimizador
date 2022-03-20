import React, { useState, useEffect } from 'react';
import { View, ToastAndroid } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { serviceLogout } from '../../api/LoginService/index.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
// import{ AuthContext } from '../components/context';

export function DrawerComponent(props) {

    useEffect(async () => {
        // console.log('PEGOU TOKEN', props)
        await getDadosToken()
    },[userData]);

    // const paperTheme = useTheme();
    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    const [userData, setUserData] = useState(null)
    const [token, setToken] = useState(null)

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const logout = async () => {
        await serviceLogout()
        AsyncStorage.removeItem('TOKEN')
        showToast("Logout realizado")
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    }
    async function getDadosToken() {

        try {
            const jsonValue = await AsyncStorage.getItem('TOKEN')
            const retorno = jsonValue != null ? JSON.parse(jsonValue) : null

            if (retorno && retorno.token && retorno.user) {
                setUserData(retorno.user)
                setToken(retorno.token)
            }
        } catch (e) {
            showToast('Realizar Login')
        }
    }

    const drawerItens = [
        {
            nameIcon: 'home',
            label: 'Home',
            route: 'Home'
        },
        {
            nameIcon: 'account',
            label: 'Usuarios',
            route: 'Usuario'
        },
        {
            nameIcon: 'store',
            label: 'Empresas',
            route: 'Empresa'
        },
    ]
    const elements = []
    for (let i = 0; i < drawerItens.length; i++) {
        elements.push(drawerItens[i])
    }
    function renderDrawerItem(item, index) {
        return (
            <DrawerItem key={(index)}
                icon={({ color, size }) => (
                    <Icon
                        name={item.nameIcon}
                        color={color}
                        size={size}
                    />
                )}
                label={item.label}
                onPress={() => {
                    props.navigation.reset(
                        {
                            index: 0,
                            routes: [{ name: item.route }],
                        }
                    )
                }
                }
            />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection} onPress={ () => {
                        props.navigation.reset(
                            {
                                index: 0,
                                routes: [{ name: 'Home' }],
                            }
                        )
                    }}>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Avatar.Image
                                source={require('../../../assets/account.png')}
                                size={50}
                            />
                            <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userData && userData.login ? userData.login : 'Login '}</Title>
                                <Caption style={styles.caption}>{userData && userData.email ? userData.email : 'email '}</Caption>
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection} >
                        <View>
                            {elements.map((item, index) => renderDrawerItem(item, index))}
                        </View>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sair"
                    onPress={() => { logout() }}
                />
            </Drawer.Section>
        </View>
    );
}
