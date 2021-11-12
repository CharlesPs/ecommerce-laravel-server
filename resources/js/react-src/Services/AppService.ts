
import Endpoints from '../Config/Endpoints'

import { get } from '../Helpers/HttpHelper'

export const getStatus = async () => {

    const url = Endpoints.status

    try {

        return await get(url, 'APP_STATUS')
    } catch (error) {

        throw error
    }
}

export default {
    getStatus,
}
