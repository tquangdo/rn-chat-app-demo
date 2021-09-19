import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator()
const AuthStack = () => {
    const [staIs1stLaunch, setStaIs1stLaunch] = useState(null) // staIs1stLaunch=null
    useEffect(() => {
        AsyncStorage.getItem('ASTO_LAUNCHED').then(item_val => {
            if (item_val == null) { // item_val=null
                AsyncStorage.setItem('ASTO_LAUNCHED', 'true')
                setStaIs1stLaunch(true) // staIs1stLaunch=true
            } else {
                setStaIs1stLaunch(false)
            }
        })
    }, [])
    let tmp_route_name
    if (staIs1stLaunch === null) {
        return null;
    } else if (staIs1stLaunch == true) {
        tmp_route_name = 'Onboarding'; // --> this!!!
    } else {
        tmp_route_name = 'Login';
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={tmp_route_name}
        >
            <Stack.Screen
                name='Onboarding' component={OnboardingScreen}
            />
            <Stack.Screen
                name='Login' component={LoginScreen}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthStack;
