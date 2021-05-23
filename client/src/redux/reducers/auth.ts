import { IUser } from "../../interfaces/IUser";

interface AuthAction {
    type: string,
    payload?: any
}

interface AuthState {
    user?: IUser,
    loggedIn: boolean
}

const initialState: AuthState = {
    loggedIn: false
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "USER_DATA":
            return {
                ...state,

            };

        default:
            return state;
    }
};