import { IError } from "../../interfaces/IError";
import { constants } from "../constants";

export const catchErrorAction = (err: IError) => {
    return {
        type: constants.CATCH_ERROR,
        payload: err
    }
};

export const removeErrorAction = () => {
    return {
        type: constants.REMOVE_ERROR
    }
};