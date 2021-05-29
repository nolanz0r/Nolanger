import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar";
import classes from "./ConversationItem.module.css";

interface IConversationItem {
  path: string;
}

export const ConversationItem: FC<IConversationItem> = ({ path }) => {
  return (
    <NavLink
      className={classes.conversation}
      to={"/chat" + path}
      activeClassName={classes.active}
    >
      <Avatar
        src={
          "https://i.pinimg.com/originals/19/3c/d0/193cd030fc246cf475c44d041b7feeb3.jpg"
        }
        size="54px"
      />
      <div className={classes.text}>
        <p className={classes.name}>John Doe</p>
        <p className={classes.message}>Lorem ipsum dolor sit amet.</p>
      </div>
    </NavLink>
  );
};
