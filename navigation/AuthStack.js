import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SignupScreen from '../screens/SignupScreen';

const AppStack = createStackNavigator()
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
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={tmp_route_name}
        >
            <AppStack.Screen
                name='Onboarding' component={OnboardingScreen}
            />
            <AppStack.Screen
                name='Login' component={LoginScreen}
            />
            <AppStack.Screen
                name="Signup"
                component={SignupScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <FontAwesome.Button
                                name="long-arrow-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    ),
                })}
            />
        </AppStack.Navigator>
    )
}

export default AuthStack;
