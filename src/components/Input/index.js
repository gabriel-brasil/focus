import classNames from "classnames";

import styles from "./input.module.scss";

function Input({ custom, ...props }) {
  return (
    <input
      className={classNames({
        [styles.input]: true,
        [styles.item__custom]: custom === "custom",
      })}
      step="1"
      type="time"
      {...props}
    />
  );
}

export default Input;
