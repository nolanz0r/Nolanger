import { FC } from "react";
import { Avatar } from "../Avatar";
import classes from "./MessageItem.module.css";

interface IMessageItem {
  mine: boolean;
  text: string;
  avatar: string;
  name: string;
}

export const MessageItem: FC<IMessageItem> = ({ mine, text, avatar, name }) => {
  return (
    <li className={mine ? classes.rightMessage : classes.leftMessage}>
      <div className={classes.user}>
        <Avatar src={avatar} size="55px" />
        <span>{name}</span>
      </div>
      <p className={mine ? classes.rightText : classes.leftText}>{text}</p>
    </li>
  );
};
