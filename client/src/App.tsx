import { FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Route, Switch } from "react-router-dom";

import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

import classes from "./assets/styles/App.module.css";

export const App: FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwt_decode(token);

      console.log(decoded);
    }
  }, []);

  return (
    <div className={classes.app}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
