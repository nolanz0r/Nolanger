import axios from "axios";
import { Dispatch } from "react";
import { IAuth } from "../../interfaces/IAuth";
import { setAuthToken } from "../../utils/setAuthToken";
import { constants } from "../constants";

const API_KEY: string = process.env.REACT_APP_API_KEY || ""

export const loginAction = (values: IAuth) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch({
                type: constants.AUTH_REQUEST,
            })
            
            await axios.post(`${API_KEY}/auth/login`, values).then(res => {


                // const { token } = res.data;
                // localStorage.setItem("jwtToken", token);

                // setAuthToken(token);

                console.log(res);


                dispatch({ type: constants.SUCCESS_REQUEST })

            })

        } catch (err) {
            dispatch({ type: constants.FAIL_REQUEST })
        }
    };
};