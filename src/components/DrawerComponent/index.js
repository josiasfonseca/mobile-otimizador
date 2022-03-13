import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import{ AuthContext } from '../components/context';

export function DrawerComponent(props, { navigation }) {

    // const paperTheme = useTheme();
    // const { signOut, toggleTheme } = React.useContext(AuthContext);
    const [userData, setUserData] = useState(null)
    const [token, setToken] = useState(null)

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const logout = async () => {
        AsyncStorage.removeItem('TOKEN')
        Alert.alert("Logout realizado")
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    }

    useEffect(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('TOKEN')
            const retorno = jsonValue != null ? JSON.parse(jsonValue) : null
            if (retorno && retorno.token && retorno.user) {
                setUserData(retorno.user)
                setToken(retorno.token)
                showToast('REDIRIRECIONAR DRAWER D')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            }
        } catch (e) {
            showToast('Realizar Login')
        }
    }, []);

    const drawerItens = [
        {
            nameIcon: 'home',
            label: 'Home',
            route: 'Home'
        },
        // {
        //     nameIcon: 'account',
        //     label: 'Usuarios',
        //     route: 'Usuarios'
        // },
        // {
        //     nameIcon: 'store',
        //     label: 'Empresas',
        //     route: 'Empresas'
        // },
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
                onPress={() => { props.navigation.navigate(item.route) }}
            />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Avatar.Image
                                source={require('../../../assets/account.png')}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
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
                    label="Sign Out"
                    onPress={() => { logout() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#13B58C',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});