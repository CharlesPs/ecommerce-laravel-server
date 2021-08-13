
import React from 'react'

import './Saludo.scss'

const Saludo = (props: any) => {

    return (
        <h1 className="saludo">{props.msg}</h1>
    )
}

export default Saludo
