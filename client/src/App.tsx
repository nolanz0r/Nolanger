import { FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { logoutAction, setCurrentUser } from "./redux/actions/auth";
import { IUser } from "./interfaces/IUser";
import { Navbar } from "./components/Navbar";
import { Chat } from "./pages/Chat";
import { setAuthToken } from "./utils/setAuthToken";

import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

import classes from "./assets/styles/App.module.css";
import { isAccessTokenExpired } from "./utils/isAccessTokenExpired";

axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

export const App: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const history = useHistory();
  const { loggedIn, user } = useSelector((state: any) => state.authReducer);

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
  }, []);

  return (
    <div className={classes.app}>
      {loggedIn ? (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/chat" component={Chat} />
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
    </div>
  );
};

export default App;
