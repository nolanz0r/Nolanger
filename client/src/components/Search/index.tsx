import { ChangeEvent, FC, SyntheticEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import classes from "./Search.module.css";

interface SearchProps {
  onSubmit: (e: SyntheticEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export const Search: FC<SearchProps> = ({ onSubmit, onChange, disabled }) => {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <input
        className={classes.input}
        placeholder="Search..."
        onChange={onChange}
      />
      <button className={classes.button} disabled={disabled}>
        <AiOutlineSearch />
      </button>
    </form>
  );
};
