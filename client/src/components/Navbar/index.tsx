import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { logoutAction } from "../../redux/actions/auth";
import { Avatar } from "../Avatar";
import {
  AiOutlineUsergroupAdd,
  AiOutlineMessage,
  AiOutlineSetting,
} from "react-icons/ai";

import { Button } from "../Button";
import { Logo } from "../Logo";

import classes from "./Navbar.module.css";

export const Navbar: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.authReducer);

  return (
    <header className={classes.navbar}>
      <div className={`${classes.navbarInner} container`}>
        <Logo />
        {/* 
      <div className={classes.menu}>
        <AiOutlineMenu className={classes.menuIcon} />
      </div> */}
        {/* <div className={classes.header}>
        <Avatar src="https://html5css.ru/howto/img_avatar.png" size="80px" />
        <div className={classes.text}>
          <p className={classes.name}>{user.name}</p>
          <p className={classes.email}>{user.email}</p>
        </div>
      </div> */}
        {/* <ul className={classes.nav}>
        <NavLink
          className={classes.navItem}
          activeClassName={classes.active}
          to="/chat"
        >
          <AiOutlineMessage className={classes.navIcon} />
          <span>Conversations</span>
        </NavLink>
        <NavLink
          className={classes.navItem}
          activeClassName={classes.active}
          to="/find"
        >
          <AiOutlineUsergroupAdd className={classes.navIcon} />
          <span>Find conversations</span>
        </NavLink>
        <NavLink
          className={classes.navItem}
          activeClassName={classes.active}
          to="/settings"
        >
          <AiOutlineSetting className={classes.navIcon} />
          <span>Settings</span>
        </NavLink>
        <div className={classes.logout}>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </ul> */}
      </div>
    </header>
  );
};
