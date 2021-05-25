import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "../Button";
import { Logo } from "../Logo";

import classes from "./Navbar.module.css";

export const Navbar = () => {
  const { user } = useSelector((state: any) => state.authReducer);
  const history = useHistory();

  const logoutHandler = () => {
    // create action for user logout
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
