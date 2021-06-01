import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { AiOutlineSend, AiOutlinePaperClip } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { MessageItem } from "../MessageItem";
import { Avatar } from "../Avatar";
import { createAction, getAllAction } from "../../redux/actions/messages";
import { IMessage } from "../../interfaces/IMessage";
import { Loader } from "../Loader";

import classes from "./Messages.module.css";

export const Messages: FC = () => {
  const bottomRef = useRef<HTMLUListElement>(null);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.auth);
  const { messages, loading } = useSelector((state: any) => state.messages);
  const { id } = useParams<{ id: string }>();

  const inputChangeHandler = (e: ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    message.length !== 0 && dispatch(createAction(user.id, id, message));

    setMessage("");
  };

  useEffect(() => {
    dispatch(getAllAction(id));
  }, [id]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTo(0, 999999);
    }
  }, [messages]);

  return (
    <>
      {loading ? (
        <div className={classes.loader}>
          <Loader width="60px" color="#fd4d4d" />
        </div>
      ) : (
        <div className={classes.messages}>
          <div className={classes.header}>
            <Link to="/chat">
              <HiOutlineArrowLeft className={classes.icon} />
            </Link>
            <div className={classes.user}>
              <Avatar
                src="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                size="66px"
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
          <ul className={classes.messagesBox} ref={bottomRef}>
            {messages.map((message: IMessage) => (
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
            <button
              className={`${classes.icon} ${classes.sendIcon}`}
              disabled={message.length === 0}
            >
              <AiOutlineSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
};