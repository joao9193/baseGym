import React from "react";
import { StyleSheet, Pressable, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { URL } from '@env';

export default function SignUp(props) {
    const [ email, onChangeEmail ] = React.useState("");
    const [ password, onChangePassword ] = React.useState("");
    const [ inputErrors, onInputErrorsChange ] = React.useState({
        email: false,
        password: false
    });

    signUpButtonPress = () => {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

        if (!emailRegex.test(email)) {
            onInputErrorsChange({
                ...inputErrors,
                email: true
            });
        }

        if (password.length < 8) {
            onInputErrorsChange({
                ...inputErrors,
                password: true
            });
        }

        if (inputErrors.email || inputErrors.password) {
            return;
        } else {
            axios.post(`${URL}/users-createEmailUser`, {
                email,
                password
            }).then((userInfo) => {
                console.log('*** userInfo ***', userInfo);
                props.onChangeLoggedIn(true);
                props.onChangeCurrentUser(userInfo);
            }).catch((error) => {
                console.log('*** Error creating user ***', error);
            })
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, inputErrors.email ? styles.inputError : '']}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={[styles.input, inputErrors.password ? styles.inputError : '']}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true} //we just added this
            />
            <Pressable
                style={styles.button}
                onPress={signUpButtonPress}
                accessibilityLabel="Create a new user"
                color='red'
            >
                <Text>Sign Up!</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
        alignItems: 'center',
		justifyContent: 'center',
        width: '100%',
	},
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '65%',
        marginTop: 15
    },
    inputError: {
        borderColor: 'red'
    },
    button: {
        borderWidth: 1,
        height: 40,
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    }
});
