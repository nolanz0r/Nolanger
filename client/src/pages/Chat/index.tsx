import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ChatStarter } from "../../components/ChatStarter";
import { Conversations } from "../../components/Conversations";
import { Messages } from "../../components/Messages";

import classes from "./Chat.module.css";

export const Chat: FC = () => {
  const { user } = useSelector((state: any) => state.authReducer);

  return (
    <div className={classes.chat}>
      <Conversations />
      <Switch>
        <Route exact path="/chat/" component={ChatStarter} />
        <Route path="/chat/:id" component={Messages} />
      </Switch>
    </div>
  );
};
