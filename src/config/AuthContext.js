import React from "react";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const AuthContext = createContext();

/**
 *  Defines a set of functions that can be used throughout the application related to 
 * user login information and Email/Password sign-in or sign-out functionality
 * @returns {AuthContext.Provider} `AuthContext.Provider` Component
 */
export const AuthContextProvider = ({ children, className="" }) => {
    const [user, setUser] = useState({});

    // See https://firebase.google.com/docs/auth/web/password-auth
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential);
                console.log('Signed in');
            })
            .catch((error) => {
                console.error(`Signin Error ${error.code}: ${error.message}`);
            });
    }

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                // Signout successful
                console.log('Signed out');
            })
            .catch((error) => {
                console.error(`Signout Error ${error.code}: ${error.message}`);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ createUser, signInUser, signOutUser, user, setUser }} className={className}>
            { children }
        </AuthContext.Provider>
    )
}

/**
 * Import this function to access all the functions defined in the AuthContextProvider method above
 * @returns All defined functions within AuthContextProvider()
 */
export const UserAuth = () => {
    return useContext(AuthContext);
}