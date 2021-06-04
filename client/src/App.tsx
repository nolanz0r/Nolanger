import { FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { logoutAction, setCurrentUser } from "./redux/actions/auth";
import { IUser } from "./interfaces/IUser";
import { Navbar } from "./components/Navbar";
import { Chat } from "./pages/Chat";
import { setAuthToken } from "./core/axios";
import { isAccessTokenExpired } from "./utils/isAccessTokenExpired";
import { ToastContainer } from "./containers/Toast/ToastContainer";
import { Conversations } from "./pages/Conversations";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import socket from "./core/socket";
import { addMessageAction } from "./redux/actions/messages";
import {
  addConversationAction,
  updateLastMessage,
} from "./redux/actions/conversations";

import classes from "./assets/styles/App.module.css";

export const App: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const history = useHistory();
  const { loggedIn } = useSelector((state: any) => state.auth);
  const { error } = useSelector((state: any) => state.errors);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded: IUser = jwt_decode(token);
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));

      if (decoded.exp) {
        isAccessTokenExpired(decoded.exp) && dispatch(logoutAction(history));
      }
    }
    socket.on("SERVER:NEW_MESSAGE", (message) => {
      dispatch(addMessageAction(message));
      dispatch(updateLastMessage(message));
    });

    socket.on("SERVER:CONVERSATION_CREATED", (conversation) => {
      dispatch(addConversationAction(conversation));
    });
  }, []);

  return (
    <div className={classes.app}>
      {loggedIn ? (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/chat" component={Conversations} />
            <Route path="/chat/:id" component={Chat} />
            <Redirect from="*" to="/chat" />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="*" to="/login" />
        </Switch>
      )}
      {error && <ToastContainer toast={error} />}
    </div>
  );
};

export default App;
