import { IError } from "../../interfaces/IError";
import { constants } from "../constants";
import { IAction } from "../store";

interface ErrorsState {
    error?: IError,
}

const initialState: ErrorsState = {};

export const errorsReducer = (state = initialState, action: IAction): ErrorsState => {
    switch (action.type) {
        case constants.CATCH_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case constants.REMOVE_ERROR:
            return {
                ...state,
                error: undefined
            };
        default:
            return state;
    }
};