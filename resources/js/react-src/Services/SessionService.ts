
import EndPoints from '../Config/Endpoints'

import { post } from '../Helpers/HttpHelper'

export const getSession = () => {

    const token = localStorage.getItem('sessionToken')
    const _data = localStorage.getItem('sessionData') || '{}'

    return { token, data: JSON.parse(_data) }
}

export const login = async (email: string, password: string) => {

    const url = EndPoints.login

    const data = { email, password }

    try {
        const res_data: any = await post(url, data, 'SESSION_LOGIN')

        localStorage.setItem('sessionToken', res_data.token)
        localStorage.setItem('sessionData', JSON.stringify({
            name: res_data.user.name,
            email: res_data.user.email,
        }))

        return res_data
    } catch (error) {

        throw error
    }
}

export const logout = async () => {

    localStorage.removeItem('sessionToken')
}

export default {
    getSession,
    login,
    logout,
}
