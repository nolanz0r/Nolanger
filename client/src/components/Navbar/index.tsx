import { FC } from "react";
import { Logo } from "../Logo";

import classes from "./Navbar.module.css";

export const Navbar: FC = () => {
  return (
    <header className={classes.navbar}>
      <div className={`${classes.navbarInner} container`}>
        <Logo />
      </div>
    </header>
  );
};
