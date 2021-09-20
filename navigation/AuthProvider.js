import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin'
import WEB_CLIENT_ID from '../config/config'

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
})
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [staUser, setStaUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                staUser,
                setStaUser,
                contxtGoogleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn()
                            .catch(err => {
                                alert(err)
                            })
                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential)
                            .catch(error => {
                                alert('Something went wrong with GG signin: ', error);
                            });
                    } catch (error) {
                        alert({ error });
                    }
                },
                contxtLogin: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        alert(e);
                    }
                },
                contxtRegister: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                //Once the user creation has happened successfully, we can add the currentUser into firestore
                                //with the appropriate details.
                                firestore().collection('users').doc(auth().currentUser.uid)
                                    .set({
                                        fname: '',
                                        lname: '',
                                        email: email,
                                        createdAt: firestore.Timestamp.fromDate(new Date()),
                                        userImg: null,
                                    })
                                    .catch(error => {
                                        alert('Something went wrong with added user to firestore: ', error);
                                    })
                            })
                            .catch(error => {
                                alert('Something went wrong with sign up: ', error);
                            });
                    } catch (e) {
                        alert(e);
                    }
                },
                contxtLogout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        alert(e);
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};