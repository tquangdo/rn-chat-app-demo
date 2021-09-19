import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [staUser, setStaUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                staUser,
                setStaUser,
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
                                    //ensure we catch any errors at this stage to advise us if something does go wrong
                                    .catch(error => {
                                        alert('Something went wrong with added user to firestore: ', error);
                                    })
                            })
                            //we need to catch the whole sign up process if it fails too.
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