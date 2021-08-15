
import SessionService from '../../Services/SessionService'

export const actionGetSession = () => {

    console.log('checking session')

    return async (dispatch: any) => {

        const session = SessionService.getSession()

        if (session.token) {

            dispatch({
                type: 'SESSION_START',
                payload: session
            })

            dispatch({ type: 'ACCOUNT_SET_DATA', payload: {
                name: session.data.name,
                email: session.data.email,
            }})
    }
    }
}

export const actionLogin = (email: string, password: string) => {

    return async (dispatch: any) => {

        try {

            const data = await SessionService.login(email, password)

            if (data.token) {

                dispatch({ type: 'SESSION_START', payload: { token: data.token }})

                dispatch({ type: 'ACCOUNT_SET_DATA', payload: {
                    name: data.user.name,
                    email: data.user.email,
                }})
            }
        } catch (error) {

            throw error
        }
    }
}

export const actionLogout = () => {

    return async (dispatch: any) => {

        try {

            await SessionService.logout()

            dispatch({ type: 'SESSION_END'})
            dispatch({ type: 'ACCOUNT_UNSET_DATA'})
        } catch (error) {

            throw error
        }
    }
}
