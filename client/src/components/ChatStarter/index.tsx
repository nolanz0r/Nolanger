import { FC } from "react";
import { Logo } from "../Logo";
import classes from "./ChatStarter.module.css";

export const ChatStarter: FC = () => {
  return (
    <div className={classes.starter}>
      <h1>Welcome to</h1>
      <div className={classes.logo}>
        <Logo />
      </div>
    </div>
  );
};
