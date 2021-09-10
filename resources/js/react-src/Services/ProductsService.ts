
import EndPoints from '../Config/Endpoints'

import { get, post, put, del } from '../Helpers/HttpHelper'

export const getResult = async (page = 1) => {

    const url = `${EndPoints.products}?page=${page}`

    try {

        return await get(url, 'PRODUCTS_GET_RESULT')
    } catch (error) {

        throw error
    }
}

export const createRow = async (product: any) => {

    const url = EndPoints.products

    try {

        return await post(url, product, 'PRODUCTS_CREATE_ROW')
    } catch (error) {

        throw error
    }
}

export const updateRow = async (product: any) => {

    const url = `${EndPoints.products}/${product.id}`

    try {

        return await put(url, product, 'PRODUCTS_CREATE_ROW')
    } catch (error) {

        throw error
    }
}

export const deleteRow = async (product_id: string) => {

    const url = `${EndPoints.products}/${product_id}`

    try {

        return await del(url, 'PRODUCTS_DELETE_ROW')
    } catch (error) {

        throw error
    }
}

export default {
    getResult,
    createRow,
    updateRow,
    deleteRow,
}
