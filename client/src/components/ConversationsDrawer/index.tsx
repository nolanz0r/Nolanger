import axios from "axios";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { IUser } from "../../interfaces/IUser";
import { createConversationAction } from "../../redux/actions/conversations";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Search } from "../Search";

import classes from "./ConversationsDrawer.module.css";

interface DrawerProps {
  state: boolean;
  close: () => void;
}

export const ConversationsDrawer: FC<DrawerProps> = ({ state, close }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.authReducer);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalUser, setModalUser] = useState<IUser>();
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");

  const openModalHandler = (user: IUser) => {
    setModalUser(user);
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const messageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
  };

  const createConversationHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (modalUser) {
      dispatch(createConversationAction(user.id, modalUser._id, messageText));
    }
    setOpenModal(false);
  };

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post(`/users?search=${searchText}&page=1`)
      .then((result) => setSearchResults(result.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      <div
        className={
          state ? classes.drawer : `${classes.drawer} ${classes.openDrawer}`
        }
      >
        <button className={classes.close} onClick={close}>
          <HiOutlineArrowLeft />
        </button>
        <Search
          onSubmit={searchSubmitHandler}
          onChange={searchChangeHandler}
          disabled={searchText.length === 0}
        />
        <ul className={classes.searchList}>
          {searchResults.map((user: IUser) => (
            <li className={classes.searchItem} key={user._id}>
              <span>{user.name}</span>
              <button onClick={() => openModalHandler(user)}>Message</button>
            </li>
          ))}
        </ul>
      </div>
      <Modal state={openModal} close={closeModalHandler}>
        <h2>Create message</h2>
        <form
          className={classes.modalForm}
          onSubmit={createConversationHandler}
        >
          <input
            className={`${classes.input} ${classes.name}`}
            value={modalUser?.name || ""}
            disabled
          />
          <textarea
            className={`${classes.input} ${classes.message}`}
            placeholder="Message..."
            onChange={messageChangeHandler}
          />
          <div className={classes.modalButtons}>
            <Button>Send</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
