import { IUser } from "../../interfaces/IUser";
import { constants } from "../constants";
import { IAction } from "../store";

interface AuthState {
    user?: IUser,
    loggedIn: boolean,
    loading: boolean
}

const initialState: AuthState = {
    loggedIn: false,
    loading: false,
};

export const authReducer = (state = initialState, action: IAction): AuthState => {
    switch (action.type) {
        case constants.AUTH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case constants.SUCCESS_REQUEST:
            return {
                ...state,
                loading: false
            };
        case constants.FAIL_REQUEST:
            return {
                ...state,
                loading: false,
            };
        case constants.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            };
        case constants.USER_LOGOUT:
            return {
                ...state,
                user: undefined,
                loggedIn: false
            };
        default:
            return state;
    }
};