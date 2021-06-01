import { FC, ReactNode } from "react";
import classes from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  state: boolean;
  close: () => void;
}

export const Modal: FC<ModalProps> = ({ children, state, close }) => {
  return (
    <div
      className={
        state
          ? classes.modalWrapper
          : `${classes.modalWrapper} ${classes.modalWrapperHide}`
      }
      onClick={close}
    >
      <div
        className={
          state ? classes.modal : `${classes.modal} ${classes.modalHide}`
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
