import { FC } from "react";
import { NavLink } from "react-router-dom";
import { IoLogoXing } from "react-icons/io5";

import classes from "./Logo.module.css";

export const Logo: FC = () => {
  return (
    <div className={classes.logo}>
      <NavLink className={classes.link} to="/">
        <IoLogoXing className={classes.icon} />
        Nolanger
      </NavLink>
    </div>
  );
};
