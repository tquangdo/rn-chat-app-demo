import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({ navigation }) => {
    const [staEmail, setStaEmail] = useState();
    const [staPassword, setStaPassword] = useState();
    const { contxtLogin,
        // contxtGoogleLogin
    } = useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/rn-social-logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>RN Chat App (DoTQ)</Text>

            <FormInput
                labelValue={staEmail}
                onChangeText={(userEmail) => setStaEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={staPassword}
                onChangeText={(userPassword) => setStaPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Dang nhap"
                onPress={() => contxtLogin(staEmail, staPassword)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => { alert('Quen password') }}>
                <Text style={styles.navButtonText}>Quen password?</Text>
            </TouchableOpacity>

            <View>
                <SocialButton
                    buttonTitle="Dang nhap bang Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                // onPress={() => contxtGoogleLogin()}
                />
            </View>

            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>
                    Bạn chưa có tài khoản? Hãy tạo tại đây
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
});