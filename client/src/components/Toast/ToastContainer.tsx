import classes from "./Toast.module.css";
import { FC } from "react";
import { IToast, Toast } from "./Toast";

interface IToastContainer {
  toasts: IToast[] | undefined;
}

export const ToastContainer: FC<any> = ({ toasts }) => {
  return (
    <div className={classes.toastContainer}>
      {toasts &&
        toasts.map((toast: IToast) => (
          <Toast key={Math.random() * Date.now()}>{toast.message}</Toast>
        ))}
    </div>
  );
};
