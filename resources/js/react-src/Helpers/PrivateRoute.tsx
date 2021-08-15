
import React from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ isAuthenticated, children, ...rest }) => {

    return (
        <Route
            { ...rest }
            render={({ location }) => (
                <>
                    {!isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: { from: location }
                            }}
                        />
                    ) : (
                        <>
                            {children}
                        </>
                    )}
                </>
            )}
        />
    )
}

export default PrivateRoute
