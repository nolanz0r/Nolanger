import axios from "axios";
import { Dispatch } from "redux";
import { sortConversationByDate } from "../../utils/sortConversationByDate";
import { constants } from "../constants";
import { IAction } from "../store";
import { catchErrorAction } from "./errors";

export const getAllAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({ type: constants.CONVERSATIONS_REQUEST })

        axios
            .get("conversation/getAll").then(res => {
                dispatch({ type: constants.CONVERSATIONS_SUCCESS_REQUEST, payload: sortConversationByDate(res.data).reverse() })
            })
            .catch(err => {
                if (err.response) {
                    dispatch(catchErrorAction(err.response.data.message))
                    dispatch({ type: constants.CONVERSATIONS_FAIL_REQUEST })
                } else {
                    dispatch({ type: constants.CATCH_ERROR, payload: "No server response. Please try letter." })
                    dispatch({ type: constants.CONVERSATIONS_FAIL_REQUEST })
                }
            });
    };
};

export const createConversationAction = (author: string, partner: string, message: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({ type: constants.CREATE_CONVERSATION_REQUEST })

        const data = {
            author,
            partner,
            message,
        }

        axios
            .post("conversation/create", data)
            .catch(err => {
                if (err.response) {
                    dispatch(catchErrorAction(err.response.data.message))
                    dispatch({ type: constants.CONVERSATIONS_FAIL_REQUEST })
                } else {
                    dispatch({ type: constants.CATCH_ERROR, payload: "No server response. Please try letter." })
                    dispatch({ type: constants.CONVERSATIONS_FAIL_REQUEST })
                }
            });
    };
};