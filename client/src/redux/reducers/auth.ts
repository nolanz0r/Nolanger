import { IUser } from "../../interfaces/IUser";
import { constants } from "../constants";

interface AuthAction {
    type: string,
    payload?: any,
}

interface AuthState {
    user?: IUser,
    loggedIn: boolean,
    loading: boolean
    errors: any[]
}

const initialState: AuthState = {
    loggedIn: false,
    loading: false,
    errors: []
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
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
                errors: [...state.errors, action.payload]
            };
        case constants.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            };
        default:
            return state;
    }
};