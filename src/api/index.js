import React, { useState } from 'react'
import {
    Alert, ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Api({ navigation }) {

    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [token, setToken] = useState(null)
    const [baseUrl] = useState('https://api-otimizador.herokuapp.com/api/')
    const [urlAuth, setUrlAuth] = useState('auth/login')

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };


    async function auth({ user, password}) {

        Alert('API: ' + user + ' ' + password)
    }
}
