
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './Helpers/PrivateRoute'

import { useDispatch, useSelector } from 'react-redux'

import { actionGetSession } from './Redux/Actions/SessionActions'

import MainLayout from './Layouts/MainLayout/MainLayout'

import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'
import ProductsPage from './Pages/ProductsPage/ProductsPage'
import { appGetStatus } from './Redux/Actions/AppActions'

const App = () => {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector((state: any) => state.Session.isAuthenticated)
    const userData = useSelector((state: any) => state.Account.data)

    const [ sessionChecked, setSessionChecked ] = useState(false)

    useEffect(() => {

        const checkSession = () => {

            dispatch(actionGetSession())

            setSessionChecked(true)
        }

        if (!sessionChecked) {

            checkSession()
        }
    }, [ isAuthenticated, sessionChecked ])

    useEffect(() => {

        const getStatus = () => dispatch(appGetStatus())

        getStatus()

        let interval = setInterval(() => getStatus(), 60000)

        return () => clearInterval(interval)
    }, [ ])

    return (
        <>
            {!sessionChecked ? null : (
                <Router>
                    <Switch>
                        <Route path="/admin/login">
                            <LoginPage />
                        </Route>
                        <MainLayout user={userData}>
                            <PrivateRoute path="/admin/" exact isAuthenticated={isAuthenticated}>
                                <HomePage />
                            </PrivateRoute>
                            <PrivateRoute path="/admin/products/" exact isAuthenticated={isAuthenticated}>
                                <ProductsPage />
                            </PrivateRoute>
                        </MainLayout>
                    </Switch>
                </Router>
            )}
        </>
    )
}

export default App
