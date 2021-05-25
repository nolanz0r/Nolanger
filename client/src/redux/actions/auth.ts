import axios from "axios";
import jwt_decode from "jwt-decode";
import { Dispatch } from "react";
import { IAuth } from "../../interfaces/IAuth";
import { IUser } from "../../interfaces/IUser";
import { setAuthToken } from "../../utils/setAuthToken";
import { constants } from "../constants";

export const loginAction = (values: IAuth, history: any) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.AUTH_REQUEST })

        axios
            .post("auth/login", values).then(res => {
                const { token } = res.data;
                if (token) {
                    localStorage.setItem("jwtToken", token);

                    setAuthToken(token);

                    const decoded: IUser = jwt_decode(token);

                    dispatch(setCurrentUser(decoded))

                    dispatch({ type: constants.SUCCESS_REQUEST })
                    history.push("/")
                }
            })
            .catch(err =>
                dispatch({ type: constants.FAIL_REQUEST, payload: err.response.data.message })
            );
    };
};

export const setCurrentUser = (user: IUser) => {
    return {
        type: constants.SET_CURRENT_USER,
        payload: user
    };
};