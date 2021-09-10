
import ProductsService from '../../Services/ProductsService'

export const productsGetResult = () => {

    return async (dispatch: any) => {

        try {

            const res = await ProductsService.getResult()

            dispatch({
                type: 'PRODUCTS_SET_RESULT', payload: res.data
            })

            return res
        } catch (error) {

            throw error
        }
    }
}

export const productsCreateRow = (product: any) => {

    return async (dispatch: any) => {

        try {

            await ProductsService.createRow(product)

            dispatch(productsGetResult())
        } catch (error) {

            throw error
        }
    }
}

export const productsUpdateRow = (product: any) => {

    return async (dispatch: any) => {

        dispatch({ type: 'PRODUCTS_SET_SAVING', payload: true })

        try {

            await ProductsService.updateRow(product)

            dispatch({ type: 'PRODUCTS_SET_SAVING', payload: false })

            dispatch(productsGetResult())

            return true
        } catch (error) {

            throw error
        }
    }
}

export const productsDeleteRow = (product: any) => {

    return async (dispatch: any) => {

        dispatch({ type: 'PRODUCTS_SET_DELETING', payload: true })

        try {

            await ProductsService.deleteRow(product.id)

            dispatch({ type: 'PRODUCTS_SET_DELETING', payload: false })

            dispatch(productsGetResult())

            return true
        } catch (error) {

            throw error
        }
    }
}

export const productsClear = () => {

    return {
        type: 'PRODUCTS_UNSET_RESULT'
    }
}
