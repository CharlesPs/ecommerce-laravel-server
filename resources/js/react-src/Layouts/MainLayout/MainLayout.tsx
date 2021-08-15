
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { actionLogout } from '../../Redux/Actions/SessionActions'

type Props = {
    user: any,
    children: any
}

const MainLayout = ({ user, children }: Props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const logout = async () => {

        await dispatch(actionLogout())

        history.replace('/admin/login')
    }

    return (
        <div>
            Sidebar
            <ul>
                <li>
                    <Link to="/admin">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/products">Products</Link>
                </li>
                <li>
                    <button onClick={() => logout()}>Cerrar sesión</button>
                </li>
            </ul>
            {children}
        </div>
    )
}

export default MainLayout
