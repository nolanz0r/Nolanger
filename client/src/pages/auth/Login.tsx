import { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/Button";
import classes from "./Auth.module.css";

export const Login: FC = () => {
  const loginHandler = () => {};

  return (
    <form className={classes.form}>
      <input className={classes.input} type="text" placeholder="Email" />
      <input className={classes.input} type="password" placeholder="Password" />
      <div className={classes.formLinkWrapper}>
        <Link className={classes.formLink} to="/forgetpassword">
          Forget password?
        </Link>
      </div>
      <Button onClick={loginHandler}>Sign in</Button>
    </form>
  );
};
