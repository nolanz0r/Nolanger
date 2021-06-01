import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import { IConversation } from "../../interfaces/IConversation";
import { getAllAction } from "../../redux/actions/conversations";
import { ConversationItem } from "../ConversationItem";
import { Logo } from "../Logo";
import { logoutAction } from "../../redux/actions/auth";

import classes from "./Conversations.module.css";
import { ConversationsDrawer } from "../ConversationsDrawer";
import { sliceText } from "../../utils/sliceText";
import { Avatar } from "../Avatar";
import { Loader } from "../Loader";
import { formatDate } from "../../utils/formatDate";

export const Conversations: FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.auth);
  const { conversations, loading } = useSelector(
    (state: any) => state.conversations
  );
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logoutAction(history));
  };

  const openDrawerHandler = () => {
    setOpenDrawer(true);
  };

  const closeDrawerHandler = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    dispatch(getAllAction());
  }, []);

  return (
    <div className={classes.conversations}>
      <ConversationsDrawer state={openDrawer} close={closeDrawerHandler} />
      <div className={classes.conversationInfo}>
        <div className={classes.text}>
          <Avatar
            size="46px"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Arh-avatar.jpg"
          />
          <span className={classes.name}>{user.name}</span>
        </div>
        <div className={classes.icons}>
          <span className={classes.tooltip} data-tooltip="Search">
            <AiOutlineSearch onClick={openDrawerHandler} />
          </span>
          <span className={classes.tooltip} data-tooltip="Logout">
            <BiLogOut onClick={logoutHandler} />
          </span>
        </div>
      </div>
      {loading ? (
        <div className={classes.loader}>
          <Loader width="60px" color="#fd4d4d" />
        </div>
      ) : (
        conversations.map((conversation: IConversation) => (
          <ConversationItem
            key={conversation._id}
            path={conversation._id}
            message={sliceText(conversation.lastMessage.text, 32)}
            name={
              conversation.author._id === user.id
                ? conversation.partner.name
                : conversation.author.name
            }
            time={formatDate(conversation.lastMessage.createdAt)}
          />
        ))
      )}
      <div className={classes.logo}>
        <Logo />
      </div>
    </div>
  );
};
