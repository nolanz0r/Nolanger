import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/auth";
import { messagesReducer } from "./reducers/messages";
import { conversationsReducer } from "./reducers/conversations";
import { errorsReducer } from "./reducers/errors";

export interface IAction {
    type: string,
    payload?: any,
}

const rootReducer = combineReducers({
    auth: authReducer,
    messages: messagesReducer,
    conversations: conversationsReducer,
    errors: errorsReducer
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);