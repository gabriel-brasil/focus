import Brand from "../Brand";
import UserOption from "../UserOption";

import styles from "./header.module.scss";

function Header() {
  return (
    <header className={styles.wrapper}>
      <Brand />
      <UserOption />
    </header>
  );
}

export default Header;
