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
          "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
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
