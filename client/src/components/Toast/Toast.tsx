import { FC, ReactNode } from "react";
import { MdErrorOutline } from "react-icons/md";
import classes from "./Toast.module.css";

export interface IToast {
  children?: ReactNode;
  message?: string;
  type?: string;
}

export const Toast: FC<any> = ({ children }) => {
  return (
    <div className={classes.toast}>
      <span className={classes.toastIcon}>
        <MdErrorOutline />
      </span>
      <div className={classes.toastContent}>{children}</div>
    </div>
  );
};
