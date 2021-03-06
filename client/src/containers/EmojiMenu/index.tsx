import {
  FC,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import emojis from "../../emoji.json";
import { outsideClick } from "../../utils/outsideClick";

import classes from "./EmojiMenu.module.css";

interface IEmojiMenu {
  onClick: (e: SyntheticEvent) => void;
}

export const EmojiMenu: FC<IEmojiMenu> = ({ onClick }) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const openEmojisHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    outsideClick(menuRef, setOpen);
  }, [menuRef]);
  
  return (
    <div className={classes.emojis}>
      <span className={classes.emoji} onClick={openEmojisHandler}>
        {emojis[0].unicode}
      </span>
      <ul
        ref={menuRef}
        className={
          open
            ? classes.emojisList
            : `${classes.emojisList} ${classes.emojisListHide}`
        }
      >
        {emojis.map((emoji, i) => (
          <li key={i + Date.now()} className={classes.emoji} onClick={onClick}>
            {emoji.unicode}
          </li>
        ))}
      </ul>
    </div>
  );
};
