import React from 'react'
import { View, Text, Button } from 'react-native'

const LoginScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Dang nhap</Text>
            <Button
                title='Click day'
                onPress={() => alert('Click day')}
            />
        </View>
    )
}

export default LoginScreen
