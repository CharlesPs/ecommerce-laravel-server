
import React from 'react'

import { useSelector } from 'react-redux'

const HomePage = () => {

    const userData = useSelector((state: any) => state.Account.data)

    return (
        <main>
            HomePage {userData.name}
        </main>
    )
}

export default HomePage
