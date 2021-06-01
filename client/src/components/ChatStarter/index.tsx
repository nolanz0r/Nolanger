import { FC } from "react";
import { IoLogoXing } from "react-icons/io5";

import classes from "./ChatStarter.module.css";

export const ChatStarter: FC = () => {
  return (
    <div className={classes.starter}>
      <IoLogoXing className={classes.icon} />
      <h1>Welcome!</h1>
      <h3 className={classes.subtitle}>Open conversation to see messages.</h3>
    </div>
  );
};
