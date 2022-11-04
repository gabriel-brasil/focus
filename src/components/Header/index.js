import Brand from "../Brand";
import UserOption from "../UserOption";

import styles from "./header.module.scss";

function Header({ setViewOptions, viewOptions }) {
  return (
    <header className={styles.wrapper}>
      <Brand />
      <button onClick={() => setViewOptions(!viewOptions)}>
        Alternate view
      </button>
      <UserOption />
    </header>
  );
}

export default Header;
