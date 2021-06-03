import { FC } from "react";
import { formatDate } from "../../utils/formatDate";
import { Avatar } from "../Avatar";
import classes from "./MessageItem.module.css";

interface IMessageItem {
  mine: boolean;
  text: string;
  avatar: string;
  name: string;
  time: string;
}

export const MessageItem: FC<IMessageItem> = ({
  mine,
  text,
  avatar,
  name,
  time,
}) => {
  return (
    <li className={mine ? classes.rightMessage : classes.leftMessage}>
      <div className={classes.user}>
        <Avatar src={avatar} size="55px" />
        <span>{name}</span>
      </div>
      <p className={mine ? classes.rightText : classes.leftText}>
        {text}
        <span className={mine ? classes.rightTime : classes.leftTime}>
          {formatDate(time).slice(13, 19)}
        </span>
      </p>
    </li>
  );
};
