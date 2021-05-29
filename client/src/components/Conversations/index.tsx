import { FC } from "react";
import { ConversationItem } from "../ConversationItem";
import { Logo } from "../Logo";
import { Search } from "../Search";
import classes from "./Conversations.module.css";

export const Conversations: FC = () => {
  return (
    <div className={classes.conversations}>
      <div className={classes.searchWrapper}>
        <Search />
      </div>
      <ConversationItem path="/dasdsa" />
      <ConversationItem path="/bb" />
      <ConversationItem path="/cc" />
      <div className={classes.logo}>
        <Logo />
      </div>
    </div>
  );
};
