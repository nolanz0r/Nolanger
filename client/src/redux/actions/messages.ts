import axios from "axios";
import { Dispatch } from "redux";
import { IMessage } from "../../interfaces/IMessage";
import { constants } from "../constants";
import { IAction } from "../store";
import { catchErrorAction } from "./errors";

export const getAllAction = (id: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({ type: constants.MESSAGES_REQUEST })

        axios
            .post("message/getAll", { conversationId: id }).then(res => {
                dispatch({ type: constants.MESSAGES_SUCCESS_REQUEST, payload: res.data })
            })
            .catch(err =>
                console.log(err)
            );
    };
};

export const createAction = (id: string, conversationId: string, message: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        axios
            .post("message/create", { text: message, conversationId, id })
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

export const addMessageAction = (message: IMessage) => {
    return {
        type: constants.MESSAGES_ADD_MESSAGE,
        payload: message
    }
}