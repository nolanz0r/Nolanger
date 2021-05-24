import { FC } from "react";
import classes from "./Loader.module.css";

interface LoaderProps {
  width: string;
  color: string;
}

export const Loader: FC<LoaderProps> = ({ width, color }) => {
  return (
    <div className={classes.loader} style={{ width: width }}>
      <svg className={classes.circular} viewBox="25 25 50 50">
        <circle
          className={classes.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
          stroke={color}
        />
      </svg>
    </div>
  );
};
