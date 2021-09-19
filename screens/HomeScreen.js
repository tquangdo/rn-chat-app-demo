import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'

const HomeScreen = () => {
    const _logOut = () => {
        contxtLogout()
    }
    const { staUser, contxtLogout } = useContext(AuthContext)
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Xin chao {staUser.email}</Text>
            <FormButton
                buttonTitle='Dang xuat' onPress={() => _logOut()}
            />
        </View>
    )
}

export default HomeScreen
