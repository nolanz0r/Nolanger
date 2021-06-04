import { useEffect } from "react";
import { FC, ReactNode } from "react";
import { MdErrorOutline, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { removeErrorAction } from "../../redux/actions/errors";

import classes from "./Toast.module.css";

export interface IToast {
  children?: ReactNode;
  message?: string;
  type?: string;
  removeErrorHandler?: () => void;
}

export const Toast: FC<IToast> = ({ children }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const removeErrorHandler = () => {
    dispatch(removeErrorAction());
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeErrorAction());
    }, 4000);
  }, []);

  return (
    <div className={classes.toast}>
      <span className={classes.toastIcon}>
        <MdErrorOutline />
      </span>
      <div className={classes.toastContent}>{children}</div>
      <button className={classes.toastClose} onClick={removeErrorHandler}>
        <MdClose className={classes.toastCloseIcon} />
      </button>
    </div>
  );
};
