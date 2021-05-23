import { IUser } from "../../interfaces/IUser";

interface authState {
    user: IUser,
    loggedIn: boolean
}

const initialState: authState = {
    user: {
        id: "",
        name: "",
        email: ""
    },
    loggedIn: false
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "USER_DATA":
            return {
                ...state,
                user: {

                },
            };

        default:
            return state;
    }
};