import { FC, FormEvent } from "react";
import { Avatar } from "../Avatar";
import { AiOutlineSend, AiOutlinePaperClip } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

import classes from "./Messages.module.css";
import { MessageItem } from "../MessageItem";

export const Messages: FC = () => {
  const sendMessageHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
  };
  return (
    <div className={classes.messages}>
      <div className={classes.header}>
        <div className={classes.user}>
          <Avatar
            src="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
            size="70px"
          />
          <div className={classes.text}>
            <p className={classes.name}>John Doe</p>
            <span className={classes.status}>Online</span>
          </div>
        </div>
        <button className={classes.icon}>
          <BiDotsVerticalRounded />
        </button>
      </div>
      <ul className={classes.messagesBox}>
        <MessageItem
          mine={true}
          avatar="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
          name="John"
          text="Heylore mdadasdasda sdasdas321loremdadas dasdasdasda s321lore mdadas dasdasdasda s321loremdadasdasdasdasd as321loremdadasdasd asdasdas321 loremda dasdasda dasda s321"
        />
      </ul>
      <form className={classes.textForm} onSubmit={sendMessageHandler}>
        <button className={classes.icon}>
          <AiOutlinePaperClip />
        </button>
        <input
          className={classes.textField}
          type="text"
          placeholder="Message..."
        />
        <button className={`${classes.icon} ${classes.sendIcon}`}>
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};
