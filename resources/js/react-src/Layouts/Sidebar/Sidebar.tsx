
import React from 'react';
import { Link } from 'react-router-dom'

import { faTachometerAlt, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SidebarDropdown from './Dropdown/SidebarDropdown';
import Dropdown from 'react-bootstrap/esm/Dropdown';

import './Sidebar.scss'

const Sidebar = (props: any) => {

    return (
        <nav className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar" style={{
            width: '100%'
        }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4">Admin</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/admin" className={`nav-link ${props.path === undefined ? 'active': 'link-dark'}`}>
                        <FontAwesomeIcon icon={faTachometerAlt} fixedWidth className="me-1" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products" className={`nav-link ${props.path === 'products' ? 'active': 'link-dark'}`}>
                        <FontAwesomeIcon icon={faStoreAlt} fixedWidth className="me-1" />
                        Products
                    </Link>
                </li>
            </ul>
            <hr />
            <SidebarDropdown
                toggle={<span>{props.user.name}</span>}
                menu={(
                    <>
                        <Dropdown.Item eventKey="1" active>1</Dropdown.Item>
                        <Dropdown.Item eventKey="1">2</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="1" onClick={() => props.onLogout()}>
                            Cerrar sesión
                        </Dropdown.Item>
                    </>
                )}
            />
        </nav>
    )
}

export default Sidebar
