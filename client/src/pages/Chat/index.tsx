import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { AiOutlineSend, AiOutlinePaperClip } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { MessageItem } from "../../components/MessageItem";
import { Avatar } from "../../components/Avatar";
import { createAction, getAllAction } from "../../redux/actions/messages";
import { IMessage } from "../../interfaces/IMessage";
import { Loader } from "../../components/Loader";

import classes from "./Chat.module.css";
import { IConversation } from "../../interfaces/IConversation";
import socket from "../../core/socket";

export const Chat: FC = () => {
  const bottomRef = useRef<HTMLUListElement>(null);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.auth);
  const { messages, loading } = useSelector((state: any) => state.messages);
  const { conversations } = useSelector((state: any) => state.conversations);
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string>("Offline");

  const inputChangeHandler = (e: ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    message.length !== 0 && dispatch(createAction(user._id, id, message));

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
    <div className={`${classes.chatWrapper} container`}>
      {loading ? (
        <div className={classes.loader}>
          <Loader width="60px" color="#fd4d4d" />
        </div>
      ) : (
        <div className={classes.chat}>
          <div className={classes.header}>
            <Link to="/chat">
              <HiOutlineArrowLeft className={classes.icon} />
            </Link>
            <div className={classes.user}>
              <Avatar
                src="https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                size="66px"
              />
              <div className={classes.text}>
                <p className={classes.name}>
                  {conversations.map((item: IConversation) => {
                    if (item._id === id) {
                      return item.author._id === user._id
                        ? item.partner.name
                        : item.author.name;
                    }
                  })}
                </p>
                <span className={classes.status}>{status}</span>
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
                mine={user._id === message.createdBy._id}
                avatar="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                name={message.createdBy.name}
                text={message.text}
                time={message.createdAt}
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
    </div>
  );
};
