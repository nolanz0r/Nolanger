import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AiOutlineSend, AiOutlinePaperClip } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { MessageItem } from "../MessageItem";
import { Avatar } from "../Avatar";
import { createAction, getAllAction } from "../../redux/actions/messages";
import { IMessage } from "../../interfaces/IMessage";

import classes from "./Messages.module.css";

export const Messages: FC = () => {
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.authReducer);
  const { messages, loading } = useSelector(
    (state: any) => state.messagesReducer
  );
  const { id } = useParams<{ id: string }>();

  const inputChangeHandler = (e: ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(createAction(user.id, id, message));
    setMessage("");
  };

  useEffect(() => {
    dispatch(getAllAction(id));
  }, [id]);

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
        {!loading &&
          messages.map((message: IMessage) => (
            <MessageItem
              key={message._id}
              mine={user.id === message.created_By._id}
              avatar="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
              name={message.created_By.name}
              text={message.text}
            />
          ))}
      </ul>
      <form className={classes.textForm} onSubmit={sendMessageHandler}>
        <button className={classes.icon}>
          <AiOutlinePaperClip />
        </button>
        <input
          className={classes.textField}
          type="text"
          placeholder="Message..."
          value={message}
          onChange={inputChangeHandler}
        />
        <button className={`${classes.icon} ${classes.sendIcon}`}>
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};
