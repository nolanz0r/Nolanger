import { FC, ReactNode } from "react";
import { Loader } from "../Loader";
import classes from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  loading,
}) => {
  return (
    <button className={classes.button} disabled={disabled} onClick={onClick}>
      {children}
      <div
        className={
          loading
            ? `${classes.loadingWrapper} ${classes.showLoading}`
            : `${classes.loadingWrapper} ${classes.hideLoading}`
        }
      >
        <Loader width="24px" color="#fff" />
      </div>
    </button>
  );
};
