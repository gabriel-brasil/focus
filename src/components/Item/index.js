import classNames from "classnames";
import { useRecoilValue } from "recoil";
import { atomConfig } from "../../states/atom";

import styles from "./item.module.scss";

function Item({ children, actived, type, id, ...props }) {
  const config = useRecoilValue(atomConfig);

  return (
    <button
      id={id}
      className={classNames({
        [styles.item]: true,
        [styles.actived]: !config && actived === id,
        [styles.item__custom]: type === "custom",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Item;
