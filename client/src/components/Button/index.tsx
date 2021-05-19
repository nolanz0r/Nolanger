import React, { FC, ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className={classes.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
