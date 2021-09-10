
import React, { forwardRef } from 'react'

const Toggle = React.forwardRef(({ children, onClick, ...rest }: any, ref: any) => (
    <a
        className="dropdown-toggle "
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault()

            onClick(e)
        }}
    >
        {children}
    </a>
))

export default Toggle
