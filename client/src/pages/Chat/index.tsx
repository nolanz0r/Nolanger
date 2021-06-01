import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { ChatStarter } from "../../components/ChatStarter";
import { Messages } from "../../components/Messages";
import socket from "../../core/socket";
import { addMessageAction } from "../../redux/actions/messages";

import classes from "./Chat.module.css";

export const Chat: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    socket.on("SERVER:NEW_MESSAGE", (message) =>
      dispatch(addMessageAction(message))
    );
  }, []);

  return (
    <div className={`${classes.chat} container`}>
      <Switch>
        <Route exact path="/chat/" component={ChatStarter} />
        <Route path="/chat/:id" component={Messages} />
      </Switch>
    </div>
  );
};
