
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { actionLogin } from '../../Redux/Actions/SessionActions'

import './LoginPage.scss'

const LoginPage = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const login = async () => {

        await dispatch(actionLogin('andres.aguinaga@gmail.com', 'asdasd'))

        history.replace('/admin')
    }

    return (
        <div className="login-page" style={{ width: '100%'}}>
            <div className="login-form">
                LoginPage
                <button onClick={() => login()}>Login</button>
            </div>
        </div>
    )
}

export default LoginPage
