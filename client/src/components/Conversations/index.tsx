import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { IConversation } from "../../interfaces/IConversation";
import { getAllAction } from "../../redux/actions/conversations";
import { ConversationItem } from "../ConversationItem";
import { Logo } from "../Logo";
import { Search } from "../Search";

import classes from "./Conversations.module.css";

export const Conversations: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.authReducer);
  const { conversations, loading } = useSelector(
    (state: any) => state.conversationsReducer
  );

  useEffect(() => {
    dispatch(getAllAction(user.id));
  }, []);

  return (
    <div className={classes.conversations}>
      <div className={classes.searchWrapper}>
        <Search />
      </div>

      {!loading &&
        conversations.map((conversation: IConversation) => (
          <ConversationItem
            key={conversation._id}
            path={conversation._id}
            message={conversation.lastMessage.text}
            name={
              conversation.author._id === user.id
                ? conversation.partner.name
                : conversation.author.name
            }
          />
        ))}
      <div className={classes.logo}>
        <Logo />
      </div>
    </div>
  );
};
