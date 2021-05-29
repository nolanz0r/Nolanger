import { FC } from "react";
import classes from "./Search.module.css";

export const Search: FC = () => {
  return <input className={classes.search} placeholder="Search..." />;
};
