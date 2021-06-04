import { FC } from "react";
import { IToast, Toast } from "./Toast";

import classes from "./Toast.module.css";

interface ToastContainerProps {
  toast: IToast;
}

export const ToastContainer: FC<ToastContainerProps> = ({ toast }) => {
  return (
    <div className={classes.toastContainer}>
      <Toast>{toast}</Toast>
    </div>
  );
};
