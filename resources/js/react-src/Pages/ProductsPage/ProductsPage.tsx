
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

const ProductsPage = () => {

    const dispatch = useDispatch()

    const userData = useSelector((state: any) => state.Account.data)

    return (
        <>
            ProductsPage
        </>
    )
}

export default ProductsPage
