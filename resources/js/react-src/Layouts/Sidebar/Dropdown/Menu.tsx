
import React, { useState } from 'react'

const Menu = React.forwardRef((props: any, ref: any) => {

    const [ value, setValue ] = useState('')

    return (
        <div
            ref={ref}
            style={props.style}
            className={props.className}
        >
            <ul className="list-unstyled">
                {props.children}
            </ul>
        </div>
    )
})

export default Menu
