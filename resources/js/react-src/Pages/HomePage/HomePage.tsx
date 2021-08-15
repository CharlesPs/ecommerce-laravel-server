
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {

    const dispatch = useDispatch()

    const userData = useSelector((state: any) => state.Account.data)

    return (
        <>
            HomePage {userData.name}
        </>
    )
}

export default HomePage
