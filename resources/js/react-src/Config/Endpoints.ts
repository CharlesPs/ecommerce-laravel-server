
import Config from './Config'

const EndPoints = {
    login: `${Config.server.host}/api/login`,
    status: `${Config.server.host}/api/admin/status`,
    products: `${Config.server.host}/api/admin/products`,
}

export default EndPoints
