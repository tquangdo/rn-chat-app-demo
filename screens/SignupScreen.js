import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({ navigation }) => {
    const [staEmail, setStaEmail] = useState();
    const [staPassword, setStaPassword] = useState();
    const { contxtRegister } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tạo một tài khoản</Text>
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
                buttonTitle="Dang ky"
                onPress={() => contxtRegister(staEmail, staPassword)}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Bằng cách đăng ký, bạn xác nhận rằng bạn sẽ chấp nhận {' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Điều khoản dịch vụ')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Điều khoản dịch vụ
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> va </Text>
                <Text style={styles.color_textPrivate}>
                    Chính sách bảo mật
                </Text>
            </View>

            <View>
                <SocialButton
                    buttonTitle="Dang ky bang Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => { alert('Dang ky bang Google') }}
                />
            </View>

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
});