import { StyleSheet,Button, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useReducer } from "react";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { signup, signin } from "../store/actions/auth.action"

import Input from "../components/Input";
import { onInputChange, onFocusOut, UPDATED_FORM } from "../utils/forms"

const initialState = {
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
};

const formReducer = (state, action) => {
    switch (action.type) {
        case UPDATED_FORM:
            const { name, value, hasError, error, touched, isFormValid } = action.data;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                    hasError,
                    error,
                    touched,
                },
                isFormValid,
            };
        default:
            return state;
    }
};


const AuthScreen = () => {
    /* const title = "REGISTRO";
    const message = "¿Ya tienes cuenta?";
    const messageAction = "Ingresar";
    const messageTarget = "Login"; */

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

    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [formState, dispatchFormState] = useReducer(formReducer, initialState);
    const title = isLogin ? "Login" : "Registro";
    const message = isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?";
    const messageAction = isLogin ? "Ingresar" : "Registrate";
    const messageTarget = isLogin ? "Ingresar" : "Registrate";
    const onHandleAuth = () => {
        const { email, password } = formState;
        dispatch(isLogin ? signin(email.value, password.value) : signup(email.value, password.value));
    };

    const onHandleChangeAuth = () => {
        setIsLogin(!isLogin);
    };

    const onHandleChange = (value, type) => {
        onInputChange(type, value, dispatchFormState, formState);
    };

    const onHandleBlur = (text, type) => {
        onFocusOut(type, text, dispatchFormState, formState);
    };
    return (
        <KeyboardAvoidingView style={styles.containerKeyboard} behavior="padding">
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Input
                    style={styles.input}
                    placeholder="Ingrese su email"
                    placeholderTextColor={colors.placerholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={(text) => onHandleChange(text, "email")}
                    onBlur={(e) => onHandleBlur(e.nativeEvent.text, "email")}
                    value={formState.email.value}
                    hasError={formState.email.hasError}
                    error={formState.email.error}
                    touched={formState.email.touched}
                    label="Correo electronico"
                />
                <Input
                    style={styles.input}
                    placeholder="Ingrese su contraseña"
                    placeholderTextColor={colors.placerholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    onChangeText={(text) => onHandleChange(text, "password")}
                    onBlur={(e) => onHandleBlur(e.nativeEvent.text, "password")}
                    value={formState.password.value}
                    hasError={formState.password.hasError}
                    error={formState.password.error}
                    touched={formState.password.touched}
                    label="Contraseña"
                />
                <Button
                    disabled={!formState.isFormValid}
                    title={messageTarget}
                    color={colors.primary}
                    onPress={onHandleAuth}
                />

                <View style={styles.prompt}>
                    <TouchableOpacity onPress={onHandleChangeAuth}>
                        <Text style={styles.promptMessage}>{message}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    containerKeyboard: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "80%",
      height: 340,
      maxWidth: 400,
      padding: 15,
      margin: 15,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.white,
    },
    title: {
      fontSize: 18,
      //fontFamily: "Lato-Regular",
      marginBottom: 15,
      textAlign: "center",
    },
    label: {
      fontSize: 14,
      //fontFamily: "Lato-Regular",
      marginVertical: 5,
    },
    prompt: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    promptMessage: {
      fontSize: 14,
      //fontFamily: "Lato-Bold",
      color: colors.text,
      marginRight: 15,
    },
    promptButton: {},
  });
  