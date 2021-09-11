
import axios from 'axios'

export const uploadFile = async (url: string, file: any, headers: any, folder: string) => {

    let formData = new FormData()

    formData.append('file', file)
    formData.append('folder', folder)

    return await axios.post(url, formData, { headers })
}
