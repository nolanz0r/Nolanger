import { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/Button";
import classes from "./Auth.module.css";

export const Register: FC = () => {
  const registerHandler = () => {};

  return (
    <form className={classes.form}>
      <input className={classes.input} type="text" placeholder="Name" />
      <input className={classes.input} type="text" placeholder="Email" />
      <input className={classes.input} type="password" placeholder="Password" />
      <div className={classes.formLinkWrapper}>
        <span className={classes.formSpan}>Already have account?</span>
        <Link className={classes.formLink} to="/login">
          Sign in
        </Link>
      </div>
      <Button onClick={registerHandler}>Sign up</Button>
    </form>
  );
};
