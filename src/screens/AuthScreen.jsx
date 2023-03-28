import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { useDispatch, useReducer } from "react-redux";
import { signUp } from "../store/actions/auth.action";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

export const formReducer = (state,action) => {
    if(action.type===FORM_INPUT_UPDATE) {
        const inputValues = {
            ...state.inputValues,
            [action.input]:action.value,
        }
        const inputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        }
        let formIsValid = true

        for (const key in inputValidities) {
            formIsValid = formIsValid && inputValidities[key]
        }

        return {
            formIsValid,
            inputValues,
            inputValidities,
        }
    }
    return state;
}


const AuthScreen = () => {
    const title = "REGISTRO";
    const message = "¿Ya tienes cuenta?";
    const messageAction = "Ingresar";
    const messageTarget = "Login";

    const dispatch = useDispatch()
    //const [email,setEmail] = useState('');
    //const [password,setPassword] = useState('')

   /*  const onHandleSignUp = () => {
        console.log("SignUp", email, password)
        dispatch(signUp(email,password))
    }

    const onHandleEmailInput = (data) => {
        setEmail(data)
        //console.log(email)
    }

    const onHandlePasswordInput = (datas) => {
        setPassword(datas)
        //console.log(password)
    } */

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false
    })

    const onHandleSignUp = () => {
        if (formState.formIsValid) {
            dispatch (signUp(formState.inputValues.email,formState.inputValues.password))
        } else {
            Alert.alert(
                'Formulario inválido',
                'Ingresa email válido'
            )
        }
    }

    const onHandleInputChange = useCallback((inputIdentifier,inputValue,inputValidity) => {
        formDispatch({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    return (
        <KeyboardAvoidingView behavior="height" style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText = {onHandleEmailInput}
                />
                <Text style={styles.label}>Clave</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText = {onHandlePasswordInput}
                />
                <View style={styles.prompt}>
                    <Text style={styles.promptMessage}>{message}</Text>
                    <TouchableOpacity  onPress={()=>onHandleSignUp(email,password)}>
                        <Text style={styles.messageAction}>{messageAction}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 18,
        textAlign: 'center'
    },
    container: {
        width: '80%',
        maxWidth: 400,
        padding: 12,
        margin: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    prompt: {
        alignItems: 'center'
    },
    promptMessage: {
        fontSize: 16,
        color: '#333',
        marginTop:20,
    },
    promptButton: {
        fontSize: 16,
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.primary,
        marginVertical: 20,
    },
    messageAction: {
        backgroundColor: colors.primary,
        width:200,
        textAlign: 'center',
        padding: 10,
        margin:10,
        color: '#fff'
    },
    input: {
        paddingVertical:6,
        borderBottomColor: "#ccc",
        borderBottomWidth:1,
    },
    label: {
        marginVertical: 5,
    }
});
