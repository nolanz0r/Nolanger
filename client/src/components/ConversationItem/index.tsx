import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar";
import classes from "./ConversationItem.module.css";

interface IConversationItem {
  path: string;
  message: string;
  name: string;
  time: string;
}

export const ConversationItem: FC<IConversationItem> = ({
  path,
  message,
  name,
  time,
}) => {
  return (
    <NavLink
      className={classes.conversation}
      to={"/chat/" + path}
      activeClassName={classes.active}
    >
      <Avatar
        src={
          "https://i.pinimg.com/originals/19/3c/d0/193cd030fc246cf475c44d041b7feeb3.jpg"
        }
        size="46px"
      />
      <div className={classes.text}>
        <p className={classes.name}>{name}</p>
        <p className={classes.message}>{message}</p>
      </div>
      <span className={classes.time}>{time}</span>
    </NavLink>
  );
};
