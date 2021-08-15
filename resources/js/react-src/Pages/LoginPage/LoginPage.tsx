
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { actionLogin } from '../../Redux/Actions/SessionActions'

const LoginPage = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const login = async () => {

        await dispatch(actionLogin('andres.aguinaga@gmail.com', 'asdasd'))

        history.replace('/admin')
    }

    return (
        <>
            LoginPage
            <button onClick={() => login()}>Login</button>
        </>
    )
}

export default LoginPage
