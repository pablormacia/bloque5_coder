import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useReducer, useEffect } from 'react'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}

const Input = ({
    initialValue,
    initialValid,
    onInputChange,
    id,
    required,
    email,
    min,
    max,
    minLength,

}) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue ? initialValue : '',
        isValid: initialValid,
        touched: false
    })

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(inputState.value, inputState.isValid)
        }
    }, [inputState, onInputChange])

    const onHandleTextChange = text => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let isValid = true

        if (required && text.trim().legth === 0) isValid = false;
        if (email && !emailRegex.test(text.toLowerCase())) isValid = false;
        if (min != null && +text < min) isValid = false;
        if (max != null && +text > max) isValid = false;
        if (minLength != null && text.length < minLength) isValid = false;

        dispatch({
            type: INPUT_CHANGE,
            value:text,
            isValid
        })

    }

    const onHandleBlur = () => dispatch({ type: INPUT_BLUR })

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={onHandleTextChange}
                onBlur={onHandleBlur}
            />
            {!inputState.isValid && inputState.touched && 
                (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                )
            }
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    formControl:{
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }
})