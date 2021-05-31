import { FC } from "react";
import classes from "./Avatar.module.css";

interface AvatarProps {
  src: string;
  size: string;
}

export const Avatar: FC<AvatarProps> = ({ src, size }) => {
  return (
    <img
      className={classes.avatar}
      src={src}
      alt="avatar"
      style={{ width: size, height: size }}
    />
  );
};
