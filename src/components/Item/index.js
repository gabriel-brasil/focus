import classNames from "classnames";

import styles from "./item.module.scss";

function Item({ children, actived, type, ...props }) {
  return (
    <button
      {...props}
      className={classNames({
        [styles.item]: true,
        [styles.actived]: actived === children,
        [styles.item__custom]: type === "custom",
      })}
    >
      {children}
    </button>
  );
}

export default Item;
