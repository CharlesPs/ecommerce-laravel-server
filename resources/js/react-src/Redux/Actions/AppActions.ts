
import AppService from "../../Services/AppService";

export const appGetStatus = () => {

    return async (dispatch: any) => {

        try {

            return await AppService.getStatus();
        } catch (error) {

            throw error
        }
    }
}

