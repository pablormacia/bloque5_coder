import { URL_AUTH_SIGNUP } from "../../constants/database";

export const SIGN_UP = "SIGN_UP"

export const signUp = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(URL_AUTH_SIGNUP, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                })
            })

            if (!response.ok) {
                const errorResponse = await response.json()
                const errorId = errorResponse.error.message

                let message = "No se ha podido registrar"
                if (errorId === 'EMAIL_EXISTS') message = 'Este email ya fue registrado'

                throw new error(message)
            }

            const data = await response.json();
            console.log(data)
            dispatch({
                type: SIGN_UP,
                token: data.idToken,
                userId: data.localId,
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }
}