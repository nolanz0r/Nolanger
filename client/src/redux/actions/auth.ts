import axios from "axios";
import jwt_decode from "jwt-decode";
import { Dispatch } from "react";
import { IAuth } from "../../interfaces/IAuth";
import { IUser } from "../../interfaces/IUser";
import { setAuthToken } from "../../utils/setAuthToken";
import { constants } from "../constants";
import { IAction } from "../store";

export const loginAction = (values: IAuth, history: any) => {
    return async (dispatch: Dispatch<IAction>) => {
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
            .catch(err => {
                if (err.response) {
                    dispatch({ type: constants.CATCH_ERROR, payload: err.response.data.message })
                    dispatch({ type: constants.FAIL_REQUEST })
                } else {
                    dispatch({ type: constants.FAIL_REQUEST, payload: "No server response. Please try letter." })
                }
            });
    };
};

export const registerAction = (values: IAuth, history: any) => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({ type: constants.AUTH_REQUEST })

        axios
            .post("auth/register", values).then(res => {
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
            .catch(err => {
                if (err.response) {
                    dispatch({ type: constants.CATCH_ERROR, payload: err.response.data.message })
                    dispatch({ type: constants.FAIL_REQUEST })
                } else {
                    dispatch({ type: constants.FAIL_REQUEST, payload: "No server response. Please try letter." })
                }
            });
    };
};

export const logoutAction = (history: any) => {
    return async (dispatch: Dispatch<IAction>) => {
        localStorage.removeItem("jwtToken")
        dispatch({ type: constants.USER_LOGOUT })
        history.push("/login")
    };
};

export const setCurrentUser = (user: IUser) => {
    return {
        type: constants.SET_CURRENT_USER,
        payload: user
    };
};
