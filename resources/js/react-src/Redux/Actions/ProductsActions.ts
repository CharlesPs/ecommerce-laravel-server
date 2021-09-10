
import ProductsService from '../../Services/ProductsService'

export const productsGetResult = (page = 1) => {

    return async (dispatch: any) => {

        try {

            const res = await ProductsService.getResult(page)

            const {
                current_page,
                data,
                first_page_url,
                from,
                last_page,
                last_page_url,
                links,
                next_page_url,
                path,
                per_page,
                prev_page_url,
                to,
                total
            } = res

            dispatch({
                type: 'PRODUCTS_SET_RESULT',
                payload: {
                    result: data,
                    page,
                    paginator: {
                        per_page,
                        path,
                        current_page,
                        last_page,
                        from,
                        to,
                        first_page_url,
                        prev_page_url,
                        next_page_url,
                        last_page_url,
                        links,
                        total
                    }
                }
            })

            return res
        } catch (error) {

            throw error
        }
    }
}

export const productsCreateRow = (product: any, page = 1) => {

    return async (dispatch: any) => {

        try {

            await ProductsService.createRow(product)

            dispatch(productsGetResult(page))
        } catch (error) {

            throw error
        }
    }
}

export const productsUpdateRow = (product: any, page = 1) => {

    return async (dispatch: any) => {

        dispatch({ type: 'PRODUCTS_SET_SAVING', payload: true })

        try {

            await ProductsService.updateRow(product)

            dispatch({ type: 'PRODUCTS_SET_SAVING', payload: false })

            dispatch(productsGetResult(page))

            return true
        } catch (error) {

            throw error
        }
    }
}

export const productsDeleteRow = (product: any, page = 1) => {

    return async (dispatch: any) => {

        dispatch({ type: 'PRODUCTS_SET_DELETING', payload: true })

        try {

            await ProductsService.deleteRow(product.id)

            dispatch({ type: 'PRODUCTS_SET_DELETING', payload: false })

            dispatch(productsGetResult(page))

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
