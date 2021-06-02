import axios from "axios";
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { IUser } from "../../interfaces/IUser";
import { createConversationAction } from "../../redux/actions/conversations";
import { catchErrorAction } from "../../redux/actions/errors";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { Modal } from "../Modal";
import { Search } from "../Search";

import classes from "./ConversationsDrawer.module.css";

interface DrawerProps {
  state: boolean;
  close: () => void;
}

export const ConversationsDrawer: FC<DrawerProps> = ({ state, close }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalUser, setModalUser] = useState<IUser>();
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [searchLength, setSearchLength] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit] = useState<number>(10);

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
    setMessageText("");
  };

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchUsers = (page: number) => {
    setLoading(true);
    axios
      .post(`/users?search=${searchText}&page=${page}&limit=${limit}`)
      .then((result) => {
        setSearchResults(result.data.users);
        setSearchLength(result.data.count);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(catchErrorAction(err.response.data.message));
        setSearchResults([]);
        setPage(0);
      });
  };

  const prevPageHandler = () => {
    setPage(page - 1);
  };

  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const searchSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    searchUsers(page);
  };

  useEffect(() => {
    searchText.length && searchUsers(page);
  }, [page]);

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
        {loading ? (
          <div className={classes.searchListLoader}>
            <Loader width="60px" color="#fd4d4d" />
          </div>
        ) : (
          <ul className={classes.searchList}>
            {searchResults.map((user: IUser) => (
              <li className={classes.searchItem} key={user._id}>
                <span className={classes.searchName}>{user.name}</span>
                <Button onClick={() => openModalHandler(user)}>
                  <AiOutlineMessage className={classes.icon} />
                </Button>
              </li>
            ))}
          </ul>
        )}
        {searchResults.length !== 0 && (
          <>
            <div className={classes.buttons}>
              <Button
                onClick={prevPageHandler}
                disabled={page === 0 || loading}
              >
                Prev
              </Button>
              <Button
                onClick={nextPageHandler}
                disabled={
                  Math.ceil(searchLength / limit) === page + 1 || loading
                }
              >
                Next
              </Button>
            </div>
            <span>{page + 1 + "/" + Math.ceil(searchLength / limit)}</span>
          </>
        )}
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
            value={messageText}
          />
          <div className={classes.modalButtons}>
            <Button>Send</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
