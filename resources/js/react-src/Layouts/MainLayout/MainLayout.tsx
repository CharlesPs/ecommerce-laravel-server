
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { actionLogout } from '../../Redux/Actions/SessionActions'

import Sidebar from '../Sidebar/Sidebar'

import './MainLayout.scss'

type Props = {
    user: any,
    children: any,
}

const MainLayout = ({ user, children, ...rest }: Props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const r: any = rest

    const path = r.location.pathname.split('/')

    const logout = async () => {

        await dispatch(actionLogout())

        history.replace('/admin/login')
    }

    return (
        <div className="main-layout">
            <div className="d-flex flex-column col-md-3 col-lg-2">
                <Sidebar user={user} path={path[2]} onLogout={logout} />
            </div>
            <div className="col-md-9 col-lg-10 ms-sm-auto px-md-3 page-content">
                {children}
            </div>
        </div>
    )
}

export default MainLayout
