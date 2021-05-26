import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { logoutAction } from "../../redux/actions/auth";

import { Button } from "../Button";
import { Logo } from "../Logo";

import classes from "./Navbar.module.css";

export const Navbar: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.authReducer);
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logoutAction(history));
  };

  return (
    <header className={classes.navbar}>
      <Logo />
      <div className={classes.logout}>
        <span>{user && user.name}</span>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </header>
  );
};
