
import React from 'react'

import './Header.scss'

const Header = (props: any) => {

    return (
        <header className="main-header">
            <div className="header-title">
                {props.title}
            </div>
        </header>
    )
}

export default Header
