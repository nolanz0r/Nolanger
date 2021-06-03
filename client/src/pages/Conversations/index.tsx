import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import { IConversation } from "../../interfaces/IConversation";
import { getAllAction } from "../../redux/actions/conversations";
import { ConversationItem } from "../../components/ConversationItem";
import { Logo } from "../../components/Logo";
import { logoutAction } from "../../redux/actions/auth";

import classes from "./Conversations.module.css";
import { ConversationsDrawer } from "../../components/ConversationsDrawer";
import { sliceText } from "../../utils/sliceText";
import { Avatar } from "../../components/Avatar";
import { Loader } from "../../components/Loader";
import { formatDate } from "../../utils/formatDate";
import { ChatStarter } from "../../components/ChatStarter";
import { Button } from "../../components/Button";

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
    <div className={`${classes.conversationsWrapper} container`}>
      <div className={classes.conversations}>
        <ConversationsDrawer state={openDrawer} close={closeDrawerHandler} />
        <div className={classes.conversationInfo}>
          <div className={classes.text}>
            <Avatar
              size="46px"
              src="https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
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
        ) : conversations.length ? (
          conversations.map((conversation: IConversation) => (
            <ConversationItem
              key={conversation._id}
              path={conversation._id}
              message={sliceText(conversation.lastMessage.text, 24)}
              name={
                conversation.author._id === user._id
                  ? conversation.partner.name
                  : conversation.author.name
              }
              time={formatDate(conversation.lastMessage.createdAt)}
            />
          ))
        ) : (
          <div className={classes.empty}>
            <h2>No conversations</h2>
            <Button onClick={openDrawerHandler}>Search</Button>
          </div>
        )}
        <div className={classes.logo}>
          <Logo />
        </div>
      </div>
      <ChatStarter />
    </div>
  );
};
