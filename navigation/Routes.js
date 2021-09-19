import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack'
import AppStack from './AppStack'

const Routes = () => {
    const { staUser, setStaUser } = useContext(AuthContext);
    const [staInitializing, setStaInitializing] = useState(true);
    const _onAuthStateChanged = arg_user => {
        setStaUser(arg_user)
        if (staInitializing) {
            setStaInitializing(false)
        }
    }
    useEffect(() => {
        const tmp_subscriber = auth().onAuthStateChanged(_onAuthStateChanged)
        return tmp_subscriber
    }, [])
    if (staInitializing) {
        return null
    }
    return (
        <NavigationContainer>
            {staUser ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes
