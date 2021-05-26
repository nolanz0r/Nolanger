import { FC } from "react";
import { IToast, Toast } from "./Toast";

import classes from "./Toast.module.css";

interface IToastContainer {
  toast: IToast;
}

export const ToastContainer: FC<IToastContainer> = ({ toast }) => {
  return (
    <div className={classes.toastContainer}>
      <Toast>{toast}</Toast>
    </div>
  );
};
