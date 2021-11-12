
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

export const getHeaders = () => {

    const uniqid = uuidv4()

    const headers: any = {
        'X-CONSUMER-ID': `WEB-ADMIN`,
        'X-REQUEST-ID': uniqid,
        'Content-Type': 'application/json'
    }

    const userToken = localStorage.getItem('sessionToken')

    if (userToken !== '') {

        headers['Authorization'] = `Bearer ${userToken}`
    }

    return headers
}

const onRequest = (method: string, request_id: string, data: any) => {

    console.log(`API ${method} REQUEST`, `Request Id: ${request_id}`, data)
}

const onSuccess = (apiStart: any, method: string, request_id: string, data: any) => {

    const apiEnd = moment()

    const diff = apiEnd.diff(apiStart)

    console.log(`API ${method} SUCCESS`, `${diff} ms`, `Request Id: ${request_id}`, data)
}

const onError = (apiStart: any, method: string, request_id: string, error: any) => {

    const apiEnd = moment()

    const diff = apiEnd.diff(apiStart)

    console.log(`API ${method} ERROR`, `${diff} ms`, `Request Id: ${request_id}`, error)

    if (error.response.status === 401 || error.response.status === 403) {

        localStorage.removeItem('sessionToken')

        window.location.href = '/admin/login'
    }
}

export const get = async (url: string, tag = '') => {

    const apiStart = moment()

    const headers = getHeaders()

    try {

        onRequest('GET', headers['X-REQUEST-ID'], { tag, url })

        const res = await axios.get(url, { headers })

        if (res.status !== 200 && res.status !== 201) {

            const message = res.data.message || res.data

            throw {
                request_id: headers['X-REQUEST-ID'],
                message,
                status: res.status
            }
        } else {

            onSuccess(apiStart, 'GET', headers['X-REQUEST-ID'], res)

            return res.data
        }
    } catch (error) {

        onError(apiStart, 'GET', headers['X-REQUEST-ID'], error)
    }
}

export const post = async (url: string, data: any, tag = '') => {

    const apiStart = moment()

    const headers = getHeaders()

    try {

        onRequest('POST', headers['X-REQUEST-ID'], { tag, url, data })

        const res = await axios.post(url, data, { headers })

        if (res.status !== 200 && res.status !== 201) {

            const message = res.data.message || res.data

            throw {
                request_id: headers['X-REQUEST-ID'],
                message,
                status: res.status
            }
        } else {

            onSuccess(apiStart, 'POST', headers['X-REQUEST-ID'], res)

            return res.data
        }
    } catch (error) {

        onError(apiStart, 'POST', headers['X-REQUEST-ID'], error)
    }
}

export const put = async (url: string, data: any, tag = '') => {

    const apiStart = moment()

    const headers = getHeaders()

    try {

        onRequest('PUT', headers['X-REQUEST-ID'], { tag, url, data })

        const res = await axios.put(url, data, { headers })

        if (res.status !== 200 && res.status !== 201) {

            const message = res.data.message || res.data

            throw {
                request_id: headers['X-REQUEST-ID'],
                message,
                status: res.status
            }
        } else {

            onSuccess(apiStart, 'PUT', headers['X-REQUEST-ID'], res)

            return res.data
        }
    } catch (error) {

        onError(apiStart, 'PUT', headers['X-REQUEST-ID'], error)
    }
}

export const del = async (url: string, tag = '') => {

    const apiStart = moment()

    const headers = getHeaders()

    try {

        onRequest('DELETE', headers['X-REQUEST-ID'], { tag, url })

        const res = await axios.delete(url, { headers })

        if (res.status !== 200 && res.status !== 201) {

            const message = res.data.message || res.data

            throw {
                request_id: headers['X-REQUEST-ID'],
                message,
                status: res.status
            }
        } else {

            onSuccess(apiStart, 'DELETE', headers['X-REQUEST-ID'], res)

            return res.data
        }
    } catch (error) {

        onError(apiStart, 'DELETE', headers['X-REQUEST-ID'], error)
    }
}
